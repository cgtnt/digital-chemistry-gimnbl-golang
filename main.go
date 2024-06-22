package main

import (
	"encoding/json"
	"flag"
	"github.com/joho/godotenv"
	"io"
	"log"
	"net/http"
	"os"
)

func main() {
	prod := flag.Bool("prod", false, "app in production")

	flag.Parse()

	if !*prod {
		err := godotenv.Load(".env")
		if err != nil {
			log.Fatal(err)
		}
	}

	store, err := NewPostgresStore()
	if err != nil {
		log.Fatal(err)
	}

	if err := store.Init(); err != nil {
		log.Fatal(err)
	}

	fs := http.FileServer(http.Dir(os.Getenv("BUILD_PATH")))

	elist := map[string]string{}

	jsonFile, err := os.Open("elementi.json")
	if err != nil {
		log.Fatal(err)
	}

	defer jsonFile.Close()

	bytes, _ := io.ReadAll(jsonFile)
	json.Unmarshal(bytes, &elist)

	server := NewHTTPServer(":8080", store, elist, fs)
	server.Run()
}
