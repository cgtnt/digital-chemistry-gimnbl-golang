build:	
	@go build -o dist/app
	@npm run build
run: build
	@./dist/app
test:
	@go test -v ./...
