package main

import (
	"encoding/json"
	"github.com/joho/godotenv"
	"io"
	"log"
	"os"
)

func main() {
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal(err)
	}

	store, err := NewPostgresStore()
	if err != nil {
		log.Fatal(err)
	}

	elist := map[string]string{}

	jsonFile, err := os.Open("elementi.json")
	if err != nil {
		log.Fatal(err)
	}

	defer jsonFile.Close()

	bytes, _ := io.ReadAll(jsonFile)
	json.Unmarshal(bytes, &elist)

	server := NewHTTPServer(":8080", store, elist)
	server.Run()
}
