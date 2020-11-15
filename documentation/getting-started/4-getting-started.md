# Getting Started

[Back](../../README.md)

1. `cp .env.example .env.dev`
2. `yarn`
3. `yarn build` (this only required after a fresh clone)
4. `yarn` (links the built workspace to our monorepo)
5. `yarn docker:up [...service]`

I find that its useful to create separate terminal tabs for different commands, as opposed to combining all scripts into one. We may not need all commands to run at once, and running separate scripts give us more flexibility.

## Frontend

- `npx nx serve web`

## Backend

- `yarn docker:up hasura` this only needs to be run once, then it will run in background
- `npx nx serve api-graph`
- `npx nx serve api-graph --args="--reset"` to reset & seed database

## Codegen

- Make sure our GraphQL server is running first, otherwise it won't work
- `make graphql-codegen` will generate files into `@codelab/state/apollo` for usage
- `make graphql-codegen-watch` to watch for changes
- These contain mostly Typescript interfaces generated from GraphQL schema
- We also generate a `hasura-schema.graphql`, which uses remote schema introspection to download our schema
- This can be used by Webstorm IDE for `.graphql` file linting

## Running other commands

Select `Run`, which will display all commands in the format of `[package]:[command]`. Use `test` for Jest, & `storybook` for Storybook.

Read more about [dev tools](5-devtools.md)
