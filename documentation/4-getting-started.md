# Getting Started

[Back](../README.md)

1. `cp .env.example .env.dev`
2. `yarn`
3. `yarn build` (this only required after a fresh clone)
4. `yarn` (links the built workspace to our monorepo)
5. `yarn start` will run backend & frontend
  - for frontend only, run `nx serve web --with-deps --parallel`
  - for backend only, run `nx serve api-gateway --with-deps --parallel`

Read more about [dev tools](5-devtools.md)

4. Select `Run`, which will display all commands in the format of `[package]:[command]`. Use `test` for Jest, & `storybook` for Storybook.