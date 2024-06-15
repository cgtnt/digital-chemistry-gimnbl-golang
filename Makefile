build:	
	@go build -o dist/app
run: build
	@./dist/app
test:
	@go test -v ./...
