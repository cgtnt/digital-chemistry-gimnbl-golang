package main

import (
	"log"
	"os"
)

func main() {
	os.Setenv("DB_PASSWORD", "testerpassword")

	store, err := NewPostgresStore()
	if err != nil {
		log.Fatal(err)
	}

	server := NewHTTPServer(":8080", store)
	server.Run()
}
