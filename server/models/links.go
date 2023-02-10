package models

import gonanoid "github.com/matoous/go-nanoid/v2"

type Link struct {
	Id  string `json:"id" db:"id"`
	Url string `json:"url" db:"url"`
}

func (l *Link) Create(url string) error {
	// check if already exists
	err := DB.QueryRow(`
		select id, url from links where url = ?
	`, url).Scan(&l.Id, &l.Url)
	if err == nil {
		return nil
	}

	var id = gonanoid.Must(3)
	_, err = DB.Exec(`
		insert into links (id, url) values (?, ?)
	`, id, url)
	if err == nil {
		l.Id = id
		l.Url = url
		return nil
	}
	return err
}

func (l *Link) Get(id string) error {
	var err = DB.QueryRow(`
		select id, url from links where id = ?
	`, id).Scan(&l.Id, &l.Url)
	return err
}
