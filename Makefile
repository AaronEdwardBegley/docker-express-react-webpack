SHELL := /bin/bash

NAME = `node -e "console.log(require('./package.json').name)"`
VERSION = `node -e "console.log(require('./package.json').version)"`

build:
	@docker build --tag=${NAME}:${VERSION} .

dev:
	@docker-compose build
	@open http://localhost:8080
	@docker-compose up


