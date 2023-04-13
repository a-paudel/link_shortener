package models

import (
	"errors"
	"math/rand"
	"net/http"
)

type Link struct {
	ID   uint   `json:"id" gorm:"primary_key"`
	Url  string `json:"url" gorm:"not null;unique"`
	Code string `json:"code" gorm:"not null;unique"`
}

func generateCode() string {
	letters := []rune("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789")
	// create a 4 letter code
	code := make([]rune, 4)
	for i := range code {
		code[i] = letters[rand.Intn(len(letters))]
	}

	// check if code exists
	var link Link
	err := DB.Where("code = ?", string(code)).First(&link).Error
	if err == nil {
		// code exists, create again
		return generateCode()
	}
	return string(code)
}

func (l *Link) Create(url string) error {
	// check if url is valid by sending a get request, needs to respond 200
	resp, err := http.Get(url)
	if err != nil || resp.StatusCode != 200 {
		return errors.New("invalid url")
	}

	// check if link exists
	var link Link
	err = DB.Where("url = ?", url).First(&link).Error
	if err == nil {
		// link exists
		println("This is happening")
		println(link.Url)
		println(link.Code)
		*l = link
		return nil
	}

	// generate code
	l.Url = url
	l.Code = generateCode()
	println(l.Code)
	println(l.Url)
	err = DB.Create(l).Error
	return err
}
