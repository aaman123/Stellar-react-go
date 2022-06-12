package handlers

import (
	"encoding/json"
	"log"
	"net/http"

	_ "github.com/go-sql-driver/mysql"

	"github.com/stellar/go/clients/horizonclient"
	"github.com/stellar/go/keypair"
	"github.com/stellar/go/protocols/horizon"
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Username       string
	SeedAddress    string
	AccountAddress string
	AccountId      string
	AccountBalance int64
}

type GetUser struct {
	User    User
	Balance horizon.Balance
}

type Users struct {
	Username string
}

func checkError(err error) {
	if err != nil {
		log.Panic(err)
	}
}

func GetUserHandler(db *gorm.DB) http.HandlerFunc {
	return func(res http.ResponseWriter, req *http.Request) {
		var user User
		username := req.URL.Query().Get("username")
		db.Where("username = ?", username).Find(&user)
		request := horizonclient.AccountRequest{AccountID: user.AccountId}
		account, err := horizonclient.DefaultTestNetClient.AccountDetail(request)

		if err != nil {
			log.Fatal(err)
		}

		data := GetUser{user, account.Balances[0]}

		json.NewEncoder(res).Encode(data)
	}
}

func RegHandler(db *gorm.DB) http.HandlerFunc {
	return func(res http.ResponseWriter, req *http.Request) {
		var users Users

		err := json.NewDecoder(req.Body).Decode(&users)

		if err != nil {
			http.Error(res, err.Error(), http.StatusBadRequest)
			return
		}

		var userExists bool
		err = db.Model(&User{}).
			Select("count(*) > 0").
			Where("username = ?", users.Username).
			Find(&userExists).
			Error

		checkError(err)

		if userExists {
			json.NewEncoder(res).Encode("Users already exists.")
		} else {
			pair, err := keypair.Random()

			if err != nil {
				log.Panic(err)
			}

			address := pair.Address()

			resp, err := http.Get("https://friendbot.stellar.org/?addr=" + address)
			checkError(err)

			resp.Body.Close()

			request := horizonclient.AccountRequest{AccountID: pair.Address()}
			account, err := horizonclient.DefaultTestNetClient.AccountDetail(request)
			checkError(err)

			db.AutoMigrate(&User{})
			db.Create(&User{Username: users.Username, SeedAddress: pair.Seed(), AccountAddress: pair.Address(), AccountId: account.AccountID})

			json.NewEncoder(res).Encode("Account created. 10,000 XLM added to your account !!")
		}
	}
}
