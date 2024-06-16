build:	
	@go build -o dist/app
	@npm run build
	@cp ./elementi.json ./dist/elementi.json
run: build
	@./dist/app
test:
	@go test -v ./...
