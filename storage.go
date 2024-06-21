package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	_ "github.com/lib/pq"
	"log"
	"os"
)

type Storage interface {
	GetElementByName(string) (*Element, error)
	CreateElement(*Element) error
	DeleteElementById(string) error
	GetAccountByUsername(string) (*AdminAccount, error)
}

type PostgresStore struct {
	db *sql.DB
}

func NewPostgresStore() (*PostgresStore, error) {
	connStr := fmt.Sprintf("user=postgres dbname=postgres password=%s sslmode=disable ", os.Getenv("DB_PASSWORD"))
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
	if err := s.CreateElementsTable(); err != nil {
		return err
	}
	if err := s.CreateAccountsTable(); err != nil {
		return err
	}
	return nil
}

func (s *PostgresStore) CreateElement(el *Element) error {
	s.DeleteElementById(el.Name)

	query := `insert into elements (name, generalproperties, specificproperties) values ($1, $2, $3);`

	generalProperties, err := json.Marshal(el.GeneralProperties)
	if err != nil {
		return err
	}

	specificProperties, err := json.Marshal(el.SpecificProperties)
	if err != nil {
		return err
	}

	if _, err := s.db.Exec(query, el.Name, generalProperties, specificProperties); err != nil {
		return err
	}

	return nil
}

func (s *PostgresStore) GetElementByName(el string) (*Element, error) {
	query := `select * from elements where name=$1;`
	row := s.db.QueryRow(query, el)

	element, err := scanIntoElement(row)
	if err != nil {
		return nil, err
	}

	return element, nil
}

func (s *PostgresStore) DeleteElementById(el string) error {
	query := `delete from elements where name=$1;`
	_, err := s.db.Exec(query, el)
	if err != nil {
		return err
	}
	return nil
}

func (s *PostgresStore) GetAccountByUsername(name string) (*AdminAccount, error) {
	query := `select * from admins where username=$1;`
	row := s.db.QueryRow(query, name)

	account, err := scanIntoAccount(row)
	if err != nil {
		return nil, err
	}

	return account, nil
}

func scanIntoElement(row *sql.Row) (*Element, error) {
	element := &Element{}
	generalPropsRaw := new([]uint8)
	specificPropsRaw := new([]uint8)

	if err := row.Scan(&element.Name, &generalPropsRaw, &specificPropsRaw); err != nil {
		return nil, err
	}

	if err := json.Unmarshal(*generalPropsRaw, &element.GeneralProperties); err != nil {
		return nil, err
	}

	if err := json.Unmarshal(*specificPropsRaw, &element.SpecificProperties); err != nil {
		return nil, err
	}

	return element, nil
}

func scanIntoAccount(row *sql.Row) (*AdminAccount, error) {
	account := &AdminAccount{}
	if err := row.Scan(&account.ID, &account.Username, &account.PasswordHash, &account.CreatedAt); err != nil {
		return nil, err
	}

	return account, nil
}

func (s *PostgresStore) CreateElementsTable() error {
	query := `create table if not exists elements (
		name text primary key,
		generalproperties json,
		specificproperties json
	);`

	_, err := s.db.Exec(query)
	return err
}

func (s *PostgresStore) CreateAccountsTable() error {
	query := `create table if not exists admins (
		id serial primary key, 
		username varchar(50),
		password_hash varchar(256),
		created_at timestamp	
	);`

	_, err := s.db.Exec(query)
	return err
}
