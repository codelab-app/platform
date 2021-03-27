## FOR ADMIN ONLY

# TODO Github issue

Create Github issue with [Github Todo](https://github.com/jasonetco/todo)

# ESLint

VSCode ESLint doesn't respect `root: true`, but includes uses it's own implementation of ESLint working directories.

So we need to specify path using `__dirname` for `tsconfigRootDir`

# CircleCI

Docker executor can't mount volumes, or use local files on remote docker environment. We use machine executor to access local files.

# NX Developemnt flow

## 1) NPM Proxy with Verdaccio

- Run `yarn docker` in this repo to start Verdaccio proxy server
- Publish in `nx` repo

## 2) Yarn link (easier)

- `nx build [repo]` in `nx` repo
- Yarn link to this repo for usage

# Linter

Using tsconfig paths require https://www.npmjs.com/package/eslint-import-resolver-typescript

Using package resolution requires https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/parser

We add `tsconfig.eslint.json` that includes all files for linting only. `eslintrc.js` has 2 config that each package needs to create, 1 for `import/no-resolved`, the other for resolving tsconfig project location.
