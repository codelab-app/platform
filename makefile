#!make

.PHONY: %

# NODE_OPTIONS_DEV=NODE_OPTIONS=--max-old-space-size=2048

#
# TERRAFORM
#

terraform-lint:
	terraform fmt -recursive .terraform && tflint .terraform

#
# BUILD
#
lambda:
	aws lambda create-function \
		--region ap-east-1 \
		--function-name HelloWorld \
		--zip-file fileb://~/Sites/Codelab/codelab/function.zip \
		--role arn:aws:iam::810113963961:role/codelab-aws-lambda \
		--handler index.handler \
		--runtime nodejs14.x
		# --profile adminuser \
		# --timeout 10 \
		# --memory-size 1024

# Next build hardcoded env vars into the compilation, since this build will be used by Cypress, we'll want to use test env
#
build-dev-affected:
	npx env-cmd -f .env.test nx affected:build \
		--configuration test \
		--parallel \

build-ci:
	npx nx run-many \
		--target=build \
		--projects=api,web,cli \
		--configuration ci \
		--parallel \
		--verbose

build-storybook:
	npx nx build-storybook web

#
# LINT
#

lint-commit-ci:
	npx commitlint --from="${CIRCLE_BASE_REVISION}" --to="${CIRCLE_REVISION}"

lint-eslint-ci:
	yarn affected:lint --configuration ci && npx prettier --check '**/*.{graphql,yaml}'

lint-circular-dep:
	yarn madge --circular apps libs --extensions ts,tsx,js,jsx

#
# E2E
#

e2e-dev-affected:
	./scripts/nx.sh affected:e2e --configuration test

e2e-ci-affected:
	yarn affected:e2e --configuration ci

#
# INTEGRATION TESTS
#
integration-dev-affected:
	./scripts/nx.sh affected:test \
		--testPathPattern=i.spec.ts \
		--memoryLimit=4096 \
		--runInBand

integration-ci:
	npx nx affected \
		--target=test \
		--testPathPattern=i.spec.ts \
		--runInBand \
		--verbose
# --maxWorkers=8 \
# --memoryLimit=8192

#
# TEST (ALL)
#
test-dev-affected:
	npx concurrently \
		--names=unit,int \
		"make unit-dev-affected" \
		"make integration-dev-affected"

#
# UNIT TEST
#
unit-dev-affected:
	npx nx affected:test \
		--testPathPattern=[^i].spec.ts \
		--silent \
		--memoryLimit=4096 \
		--parallel

unit-ci:
	npx nx run-many \
		--testPathPattern=[^i].spec.ts \
		--target=test \
		--all \
		--verbose

