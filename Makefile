# always latest with no arguments
VERSION=latest

# HELP
# This will output the help for each task
# thanks to https://marmelab.com/blog/2016/02/29/auto-documented-makefile.html
.PHONY: help

help: ## This help.
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)
	@echo ''
	@echo 'make build # will use $(VERSION) as tag'
	@echo 'make build VERSION=$$(jq -rM '.version' package.json) # will use :latest as tag'

.DEFAULT_GOAL := help

start:
	docker-compose up