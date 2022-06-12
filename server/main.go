package main

import (
	"aman/config"
	"aman/handlers"

	"log"
	"net/http"

	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/mux"
	"github.com/rs/cors"

	"gorm.io/gorm"
)

func indexHandler(db *gorm.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		log.Println("Everything ok")
	}
}

func main() {
	port := "8080"

	db := config.DBconfig()

	router := mux.NewRouter()

	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000"},
		AllowCredentials: true,
	})

	routeHandler := c.Handler(router)
	router.HandleFunc("/", indexHandler(db)).Methods("GET")
	router.HandleFunc("/register", handlers.RegHandler(db)).Methods("POST")
	router.HandleFunc("/getUser", handlers.GetUserHandler(db)).Methods("GET")
	http.ListenAndServe(":"+port, routeHandler)

}
