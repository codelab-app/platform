## FOR ADMIN ONLY

# TODO Github issue

Create Github issue with [Github Todo](https://github.com/jasonetco/todo)

# ESLint

VSCode ESLint doesn't respect `root: true`, but includes uses it's own implementation of ESLint working directories.

So we need to specify path using `__dirname` for `tsconfigRootDir`

# NX Developemnt flow

## 1) NPM Proxy with Verdaccio

- Run `yarn docker` in this repo to start Verdaccio proxy server
- Publish in `nx` repo

## 2) Yarn link (easier)

- `nx build [repo]` in `nx` repo
- Yarn link to this repo for usage

# Atomic Design

Similar to this https://bradfrost.com/blog/post/atomic-web-design/#molecules, we use our own hierarchy.

## Page

An instance of a template

## Template

A re-useable context for data binding, has all UI in place.

## Section

A distinct building block like sidebar, header, footer etc.

## Snippet

Collection of components like a search bar (composed of button + input)

## Component

Smallest UI part, button etc.

# Linter

Using tsconfig paths require https://www.npmjs.com/package/eslint-import-resolver-typescript

Using package resolution requires https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/parser

We add `tsconfig.eslint.json` that includes all files for linting only. `eslintrc.js` has 2 config that each package needs to create, 1 for `import/no-resolved`, the other for resolving tsconfig project location.
