package models

import (
	"database/sql"
	"os"

	_ "github.com/mattn/go-sqlite3"
)

var DB *sql.DB

func init() {
	os.MkdirAll("data/database", os.ModePerm)
	db, err := sql.Open("sqlite3", "data/database/links.db")
	if err != nil {
		panic(err)
	}
	err = db.Ping()
	if err != nil {
		panic(err)
	}

	// create schema
	db.Exec(`
	create table if not exists links (
		id text not null unique primary key,
		url text not null unique
	)
	`)
	DB = db
}
