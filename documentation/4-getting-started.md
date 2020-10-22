# Getting Started

[Back](../README.md)

1. `cp .env.example .env.dev`
2. `yarn`
3. `yarn start` will run backend & frontend
  - for frontend only, run `nx serve web --with-deps --parallel`
  - for backend only, run `nx serve api-gateway --with-deps --parallel`

The NX Console tab has all the commands you'll need to interact with the app under the `Generate & Run Target` section. For the most part, you'll be developing with Jest & Storybook.

Read more about [dev tools](devtools.md)

4. Select `Run`, which will display all commands in the format of `[package]:[command]`. Use `test` for Jest, & `storybook` for Storybook.