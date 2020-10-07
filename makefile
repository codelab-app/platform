#!make

.PHONY: %

#
# BUILD
#

build-dev:
	@npx nx run-many \
	--target=build \
	--all \
	--parallel \
	"$@"

build-ci:
	@npx nx run-many \
    --target=build \
    --all \
    --parallel \
    --maxWorkers=4

build-prod:
	@npx nx run-many \
    --target=build \
    --projects=web,api \
    --with-deps \
    --parallel \
    --skip-nx-cache \
    --maxWorkers=4

#
# Docker
#

# local usage
docker-start:
	# yarn --frozen-lockfile; \
	# make build-prod; \
	# yarn --frozen-lockfile --prod;
	docker-compose \
	-f .docker/docker-compose.yml \
	up --build app

docker-build:
	@docker-compose \
  --verbose \
  -f .docker/docker-compose.yml \
  build app

docker-push:
	@docker-compose \
		-f .docker/docker-compose.yml \
		push app

#
# LINT
#

lint-commit-ci:
	@echo "${CIRCLE_BASE_REVISION}"
	@npx commitlint --from="${CIRCLE_BASE_REVISION}" "$@"

lint-commit-dev:
	@npx commitlint -E HUSKY_GIT_PARAMS

lint-eslint:
	NODE_OPTIONS=--max-old-space-size=8192 node scripts/lint/eslint.js

#
# TEST
#

test-dev:
	@npx nx run-many \
	--target=test \
	--all \
	--parallel \
	--silent \
	"$@"

test-ci:
	@npx nx run-many \
	--target=test \
	--all \
	--parallel \
	--maxWorkers=4 \
	--silent

#
# START
#

start-dev:
	@npx nx run-many \
	--target=serve \
	--projects=web,api \
	--parallel \
	"$@"

start-prod:
	@pm2 startOrReload config/pm2.json

#
# Other
#
docs:
	typedoc --out libs/core/tree/docs libs/core/tree
