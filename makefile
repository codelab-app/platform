#!make

.PHONY: %


#
# LINT
#

lint-commit-ci:
	npx commitlint \
		--from="${CIRCLE_BASE_REVISION}" \
		--to="${CIRCLE_REVISION}"

#
# TEST (ALL)
#
test-dev-affected:
	npx concurrently \
		--names=unit,int \
		"make unit-dev-affected" \
		"make integration-dev-affected"
