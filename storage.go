package main

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	_ "github.com/lib/pq"
)

type Storage interface {
	GetByElement(string) (*Page, error)
}

type PostgresStore struct {
	db *sql.DB
}

func NewPostgresStore() (*PostgresStore, error) {
	connStr := fmt.Sprintf("user=postgres dbname=postgres password=%s sslmode=disable", os.Getenv("DB_PASSWORD"))
	db, err := sql.Open("postgres", connStr)
	if err != nil {
		return nil, err
	}

	if err := db.Ping(); err != nil {
		return nil, err
	}

	log.Println("Database is running")

	return &PostgresStore{
		db: db,
	}, nil
}

func (s *PostgresStore) Init() error {
	return s.CreatePagesTable()
}

func (s *PostgresStore) GetByElement(el string) (*Page, error) {
	query := `select * from pages where element=$1`
	rows, err := s.db.Query(query, el)
	if err != nil {
		return nil, err
	}

	page, err := scanIntoPage(rows)
	if err != nil {
		return nil, err
	}

	return page, nil
}

func (s *PostgresStore) CreatePagesTable() error {
	query := `create table if not exists pages (
		id serial primary key,
		element varchar(30),
		content text 
	)`

	_, err := s.db.Exec(query)
	return err
}

func scanIntoPage(rows *sql.Rows) (*Page, error) {
	page := &Page{}

	if err := rows.Scan(&page.ID, &page.Element, &page.Content); err != nil {
		return nil, err
	}

	return page, nil
}
