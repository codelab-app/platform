# Getting Started

[Back](../../README.md)

1. `yarn docker:up alpha alpha-test`

This starts an application instance of Dgraph, and a test instance of Dgraph (used for integration testing)

2. `cp .env.example .env` & get env from Slack
3. `yarn`

## Services

### Frontend

- `nx serve web`

### Backend

- `nx serve api`

### Generator

- `yarn codegen` after you update `.graphql` files to get generate Apollo hooks

### Dgraph

## Running other commands

Select `Run`, which will display all commands in the format of `[package]:[command]`. Use `test` for Jest, & `storybook` for Storybook.

Read more about [dev tools](5-devtools.md)
