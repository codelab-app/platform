# Getting Started

[Back](../../README.md)

1. `cp .env.example .env`
2. `yarn`
3. `yarn build` (this only required after a fresh clone)
4. `yarn` (links the built workspace to our monorepo)
5. `yarn docker:up [...service]`

- Docker services `postgres` & `postgres-test` are required, so `yarn docker:up postgres postgres-test`

## Frontend

- `nx serve web`

## Backend

- `nx serve api-codelab`

## Prisma

`yarn` will automatically generate prisma client (which has typings), and sync database.

Sometimes database schema may get out of shape, to reset go to `prisma/schema.prisma` and modify to correct `datasource.db.url` then run `yarn prisma:reset`.

Make sure `datasource.db.url` is changed back to production url if you had modified it.

Prisma doesn't allow us to modify url at runtime, so we default to production url, and inject our own test url during tests.

## Generator

- `yarn generate:graphql` after you update `.graphql` files to get generated files inside `@codelab/generated`

- `yarn generate:json` after you update `*Input.ts` files to generate Json Schema

## Running other commands

Select `Run`, which will display all commands in the format of `[package]:[command]`. Use `test` for Jest, & `storybook` for Storybook.

Read more about [dev tools](5-devtools.md)

## Git hooks not working

If tests aren't running pre-push, you may do the following

```
rm -rf .git/hooks/
yarn remove -W husky
yarn add -W -D husky
```
