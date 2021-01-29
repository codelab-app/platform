#!make

.PHONY: %

# NODE_OPTIONS_DEV=NODE_OPTIONS=--max-old-space-size=2048

#
# BUILD
#

build-dev-affected:
	npx nx affected:build \
		--parallel

build-dev:
	npx nx run-many \
	--target=build \
	--all \
	--parallel

build-ci:
	npx nx run-many \
		--memoryLimit=8192 \
    --target=build \
		--projects=api-codelab,web,tools-eslint-config-codelab,codelab-schematics \
    --parallel \
    --maxWorkers=4 \
		--verbose \
		--skip-nx-cache

build-prod:
	npx nx run-many \
		--memoryLimit=4096 \
    --target=build \
    --projects=web,api-gateway,api-services-props \
    --with-deps \
    --parallel \
    --skip-nx-cache \
    --maxWorkers=4

#
# GENERATE
#

generate-ci:
	npx nx run-many \
		--memoryLimit=4096 \
    --target=build \
		--projects=tools-generators-graphql,tools-generators-json-schema \
    --parallel \
    --maxWorkers=4 \
		--verbose \
		--skip-nx-cache

generate-json-schema:
	npx typescript-json-schema \
		libs/modules/graph/tsconfig.lib.json \
		AddChildVertexRequest && \
	npx typescript-json-schema \
		libs/alpha/ui/antd/tsconfig.lib.json \
		Affix.AntdProps

generate-graphql:
	npx graphql-codegen --config .graphqlconfig.yaml

generate-graphql-watch:
	npx graphql-codegen --config .graphqlconfig.yaml --watch "apps/api/graph/src/assets/**/*.graphql"

#
# LINT
#

lint-commit-ci:
	@echo "${CIRCLE_BASE_REVISION}"
	npx commitlint --from="${CIRCLE_BASE_REVISION}" "$@"

lint-commit-dev:
	npx commitlint -E HUSKY_GIT_PARAMS

lint-eslint:
	node scripts/lint/eslint.js

#
# E2E
#

# e2e-dev-affected:
# 	npx nx affected:e2e \
# 	--parallel \
# 	--silent

e2e-dev:
	npx concurrently \
  	--kill-others \
  	--success=first \
		--names=web-e2e,api-codelab,web \
    	"npx wait-on \
				http://localhost:3001 \
				http://localhost:4001 && \
				nx run web-e2e:e2e:ci" \
			"npx env-cmd -f .env cross-env PORT=4001 \
				node dist/apps/api/codelab/main.js" \
			"npx next start -p 3001 dist/apps/web"

e2e-ci:
	npx concurrently \
  	--kill-others \
  	--success=first \
		--names=web-e2e,api-codelab,web \
    	"npx wait-on \
				http://localhost:3001 \
				http://localhost:4001 && \
				nx run web-e2e:e2e:ci" \
			"npx cross-env PORT=4001 \
				node dist/apps/api/codelab/main.js" \
			"npx next start -p 3001 dist/apps/web"
#
# INTEGRATION TESTS
#
integration-dev:
	npx nx run-many \
	--target=test \
	--testPathPattern=i.spec.ts \
	--runInBand \
	--all

integration-dev-affected:
	npx nx affected:test \
	--testPathPattern=i.spec.ts \
	--runInBand

integration-ci:
	npx cross-env PRISMA_DATABASE_URL=TEST_PRISMA_DATABASE_URL && \
	yarn prisma:reset && \
	npx nx run-many \
	--target=test \
	--testPathPattern=i.spec.ts \
	--all \
	--runInBand \
	--verbose \
	--skip-nx-cache

#
# TEST (ALL)
#
test-dev-affected:
	npx concurrently \
		--names=unit,int,e2e \
 		"make unit-dev-affected" \
  	"make integration-dev-affected" \
  	"make e2e-dev"

test-dev:
	npx concurrently \
		--names=unit,int,e2e \
 		"make unit-dev" \
  	"make integration-dev" \
  	"make e2e-dev"

#
# UNIT TEST
#
unit-dev-affected:
	npx nx affected:test \
	--testPathPattern=[^i].spec.ts \
	--silent \
	--parallel

unit-dev:
	npx nx run-many \
	--target=test \
	--testPathPattern=[^i].spec.ts \
	--parallel \
	--silent \
	--all

unit-ci:
	npx nx run-many \
	--memoryLimit=8192 \
	--testPathPattern=[^i].spec.ts \
	--target=test \
	--all \
	--maxWorkers=4 \
	--skip-nx-cache \
	--verbose

#
# START
#

start-dev:
	@npx concurrently \
		--names="start,codegen" \
		"make start-dev-projects" \
		"make generate-graphql-watch"

start-dev-projects:
	@npx nx run-many \
		--target=serve \
		--with-deps \
		--projects=api-gateway,web \
		--parallel \
		--maxParallel=10

start-api:
	npx nx serve api-gateway \
		--maxParallel=6 \
		--with-deps \
		--parallel

#	@npx concurrently \
#	--names="start" \
#		'nx run-many \
#		--target=serve \
#		--projects=web,api-gateway,api-services-props,api-graph \
#		--parallel \
#		"$@"' \
#		'nodemon \
#			--ext graphql \
#			--watch "apps/api/gateway/src/assets/**/*.graphql" \
#			--verbose \
#			--exec "wait-on http://localhost:4000 && make generate-graphql"'
		# Need to wait for graphql server to finish reloading

start-prod:
	pm2 startOrReload config/pm2.json

#
# Other
#
docs:
	typedoc --out libs/core/tree/docs libs/core/tree
