package models

import (
	"os"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var DB *gorm.DB

func init() {
	os.Mkdir("data", os.ModePerm)
	db, err := gorm.Open(sqlite.Open("data/links.db"))
	if err != nil {
		println("Could not open database")
		panic(err)
	}

	db.AutoMigrate(&Link{})
	DB = db
}
