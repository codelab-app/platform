# Getting Started

[Back](../../README.md)

1. `cp .env.example .env.dev`
2. Update `NEO4J_URL`, `NEO4J_USERNAME`, `NEO4J_PASSWORD` in `.env`
  - Usually is `NEO4j_URL=bolt://localhost:7687`
2. `yarn`
3. `yarn build` (this only required after a fresh clone)
4. `yarn` (links the built workspace to our monorepo)
5. `yarn docker [service ...]`
  - service can be `neo4j`, `neo4j`, `fluentd`

I find that its useful to create separate terminal tabs for different commands, as opposed to combining all scripts into one. We may not need all commands to run at once, and running separate scripts give us more flexibility.

## Frontend
- `nx serve web`

## Backend
- `nx serve api-gateway --with-deps --parallel`
- This will start `api-federation-props` & `api-federation-nodes` first

## Codegen

- `make graphql-codegen` will generate files into `@codelab/state/apollo` for usage

## Running other commands

Select `Run`, which will display all commands in the format of `[package]:[command]`. Use `test` for Jest, & `storybook` for Storybook.

Read more about [dev tools](5-devtools.md)



