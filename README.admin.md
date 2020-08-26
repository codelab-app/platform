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
