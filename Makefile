build:	
	@go build -o dist/app
	@cp -a ./dist/client/build/images/. ./public/images/
	@npm run build
	@rm -r ./public/images
	@cp ./elementi.json ./dist/elementi.json
run: build
	@./dist/app
test:
	@go test -v ./...
