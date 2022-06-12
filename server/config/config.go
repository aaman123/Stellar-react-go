package config

import (
	"log"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func DBconfig() *gorm.DB {
	dsn := "root:@tcp(127.0.0.1:3306)/Stellar_go?charset=utf8mb4&parseTime=True&loc=Local"
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})

	if err != nil {
		log.Fatal(err)
	}

	return db
}
