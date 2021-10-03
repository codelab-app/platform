## Component Factory design

## Mongoose

- subdocument vs reference: subdocument is easier & more efficient, unless the data may become large. for your app, it's perfect to use subdocument

- Actually, I'm quite curious why nobody spoke about the UML specifications. A rule of thumb is that if you have an aggregation, then you should use references. But if it is a composition, then the coupling is stronger, and you should use embedded documents.

  And you will quickly understand why it is logical. If an object can exist independently of the parent, then you will want to access it even if the parent doesn't exist. As you just can't embed it in a non-existing parent, you have to make it live in it's own data structure. And if a parent exist, just link them together by adding a ref of the object in the parent.

## Build Gotcha's

- JSON not included when using composite mode https://github.com/TypeStrong/ts-loader/issues/905
- Nest.js will replace tsconfig.json with `module: esnext`, but this disallows us to use import without specifying `type: module` in package.json, but this breaks compilation, so we create a separate `tsconfig.sever.json` to compile, then use `tsconfig.json` for IDE linting only.

- We looked into webpack because tsc artifacts cannot be run by node (missing .js extension), but ts-node-dev does what we want

- Project references need to have type build first. (but we end up not using this)

- Exclude doesn't work for workspaces, need to use glob.

- Need to keep `src` for import path, `@zerollup/ts-transform-paths` can only remove path to make relative path.

- ES6 module needs file extension, but Typescript doesn't support that, so we need to use Webpack ts-loader

- deedash requires ESM to be used

- Nestjs CLI is getting hoisted to root, and is including package of different versions

- Target use ES2018 https://stackoverflow.com/questions/58813176/webpack-cant-compile-ts-3-7-optional-chaining-nullish-coalescing

- Nohoist can be used but needs to delete node_modules first, and requires 2 path declarations

- When declaring multiple tsconfig paths in shared module, eslint will treat that as all lookup location per package. Instead, we want to declare tsconfig path per package, this narrows the lookup scope.

- https://stackoverflow.com/questions/39040108/import-class-in-definition-file-d-ts

- `tsconfig.json` `references` allow dependencies to be built as well. We don't need paths because yarn workspace already links scope for us.

- ts-node doesn't work with project references, https://github.com/TypeStrong/ts-node/issues/897

- Nextjs requires module esnext, and doesn't allow us to import. It also needs noEmit to be set, which can't be used together with the composite config

- Yarn workspace & typescript path alias are separate things. https://medium.com/@rossbulat/typescript-working-with-paths-packages-and-yarn-workspaces-6fbc7087b325

It just happened that workspace allows path alias to be omitted during references. But some build tools like madge still need path aliases to resolve paths.

- Tsconfig build order specified by references. https://stackoverflow.com/questions/57679322/how-to-use-yarn-workspaces-with-typescript-and-out-folders.

We can have a root config that tells us where all the packages are, but order info isn't available there.

- ts-node 8.10.2 not picking up types unless `--files` is specified. A bug https://github.com/TypeStrong/ts-node/issues/782

- storybook still depends on tsc for compiling packages. it only needs ts-loader to load story files, not actual library code

- inner most tsconfig's files, exclude, includes override that of parent (no merge).

- we want to include stories from tsc, otherwise it is loaded twice

## IDE

- Webstorm scope by default includes libraries, which includes node_modules
- Remove them here https://stackoverflow.com/questions/47149448/webstorm-make-node-modules-library-root-but-also-exclude-it-from-indexing/47156247 to exclude ndoe_modules from search

## TSC vs Webpack vs Rollup

- The source of the issue is that typescript can't resolve absolute paths when building types, or transpile from ESM to ES6/CommonJS (deepdash uses ESM, making our library ESM if we don't transpile, and Next.js can't import ESM)

- We previously used a dual Webpack (script) & TSC (types) approach, but requires us to maintain 2 separate build tools

- Webpack has issues building types & script at the same time, but Rollup seems to be promising

## ts-node vs ts-node-dev vs nodemon

- Nodemon approach runs on dist js scripts directly but has poor performance

- ts-node-dev seems to be the best for running server-side scripts

## Git

git submodule add --force <git_submodule_repository>

1. git commit --fixup <commit>

- mark your commit as a fix of a previous commit

2. git rebase -i --autosquash

- merge fixups

Commit message regex: \#\d+\.\s[A-Z].\*

## Workflow

- Need to have issue # in commit message so we know what issue each commit solves
