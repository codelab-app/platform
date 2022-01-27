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

# Next build hardcoded env vars into the compilation, since this build will be used by Cypress, we'll want to use test env
#
build-dev-affected:
	 ./scripts/nx.sh affected:build \
		--configuration test \
		--parallel
#		--verbose \

build-ci:
	npx nx affected:build \
		--projects=api,web,cmd,cli,tools-rtk-query \
		--configuration=ci \
		--parallel \
		--max-parallel=3 \
		--verbose

build-storybook:
	npx nx build-storybook web

#
# LINT
#

lint-commit-ci:
	npx commitlint \
		--from="${CIRCLE_BASE_REVISION}" \
		--to="${CIRCLE_REVISION}"

lint-eslint-ci:
	yarn nx affected:lint \
		--configuration=ci \
		--parallel \
		--maxParallel=5 \
		--quiet && \
		npx prettier --check '**/*.{graphql,yaml,json}'

lint-circular-dep:
	yarn madge --circular apps libs --extensions ts,tsx,js,jsx

#
# E2E
#

e2e-dev-affected:
	./scripts/nx.sh affected:e2e --configuration test --browser firefox

e2e-ci:
	yarn affected:e2e --configuration ci --record --browser firefox

#
# INTEGRATION TESTS
#

integration-dev-affected:
	./scripts/nx.sh affected:test \
		--testPathPattern="i.spec.ts" \
		--parallel=1 \
		--memoryLimit=4096 \
		--runInBand

integration-ci:
	npx nx affected:test \
		--testPathPattern="i.spec.ts" \
		--parallel=1 \
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
	./scripts/nx.sh affected:test \
		--testPathPattern="[^i].spec.ts" \
		--silent \
		--memoryLimit=4096 \
		--parallel=3 \
		--color

unit-ci:
	npx nx affected:test \
		--testPathPattern="[^i].spec.ts" \
		--parallel \
		--verbose \
		--color
# --detectOpenHandles

unit-debug:
	npx nx run-many \
		--skip-nx-cache \
		--testPathPattern="[^i].spec.ts" \
		--target=test \
		--all \
		--parallel \
		--verbose \
		--color
