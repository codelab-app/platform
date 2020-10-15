# What is Codelab.ai

Codelab.ai is a web application builder that renders components using React. Users can...

(not related to artificial intelligence)

- configure the layout using React Grid Layout
- create components by specifying props
- create Mongoose schema & add data
- attach components to layout

Everything can be done using an abstracted UI layer (via forms, tables, custom UI etc). Our approach differs from Wordpress, Shopify & other platforms in that our core code resembles code you would normally write. We have just created a convenient wrapper at the UI layer for you to interact with.

## Built With

### Build

- [NX](https://nx.dev/react)
  - NX is a CLI toolkit for Monorepo development, similar to Angular CLI but framework agnostic
  - It scaffolds packages & provide us with a unified API for interacting with our libraries

### Frontend

- [React](https://reactjs.org)
  - A JavasScript library for building user interfaces, although we only use `.tsx`
- [Next.js](https://nextjs.org)
  - A React Framework for server-side rendering (SSR) & other performance optimizations
- [Rest Hooks](https://resthooks.io)
  - A repository layer that handles data fetching, caching, validation, data mapping, error handling

### Backend

- [Mongoose](https://mongoosejs.com)
- [Neo4j](https://neo4j.com/)
  - A graph database
- [Nest.js](https://nestjs.com)
  - A Node.js framework suitable for micro-services architecture, which heavily uses OOP principles such as dependency injection (DI)
- [Express Restify Mongoose](https://florianholzapfel.github.io/express-restify-mongoose)
  - A wrapper around Mongoose to provide easy to use API endpoints

### UI

- [Storybook](https://storybook.js.org)
  - A tool for developing UI components in isolation
- [Ant Design](https://ant.design)
  - A UI/Component library for React

### Testing

- [Jest](https://jestjs.io)
  - JavaScript testing framework
- [Cypress](https://www.cypress.io)
  - E2e testing framework

## Plugins to Install

1. Install [NX Console](https://marketplace.visualstudio.com/items?itemName=nrwl.angular-console), you will use the interface to run the application
2. Install [Move TS](https://marketplace.visualstudio.com/items?itemName=stringham.move-ts)

- VSCode doesn't auto update imports when renaming files, use this to help with moving files

3. (Optional) Install [WebStorm](https://www.jetbrains.com/webstorm/)

- VSCode doesn't allow us to move an export (function, variable, class etc.) from one file to another, which is a huge limitation in refactoring, as this is a common procedure
- WebStorm does have this functionality, but is a paid product. They have a 30-day free trial you can try out the feature. If you find the program useful we can consider purchasing a license for you.

3. Install [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint), for realtime visual linting

The project directory structure is based on NX, with `apps` directory containing all the user facing sites, while `libs` containing all imported libraries.

## Getting Started

1. Clone a forked version of the repository
2. `cp .env.example .env.dev`
3. `yarn`

The NX Console tab has all the commands you'll need to interact with the app under the `Generate & Run Target` section. For the most part, you'll be developing with Jest & Storybook.

4. Select `Run`, which will display all commands in the format of `[package]:[command]`. Use `test` for Jest, & `storybook` for Storybook.

## CI/CD pipeline

Clone off master and create a local branch using a name that is relevant to the task in hyphenated-lowercase-or-kebab-case. Always rebase master branch before you push, so merge won't have any issues.

To commit code, run `yarn commit`. (This will trigger the git `pre-commit` hook via [Husky](https://github.com/typicode/husky), which then uses [Lint Staged](https://github.com/okonet/lint-staged) to run [ESLint](https://github.com/eslint/eslint) on staged files. ESLint will use [Prettier](https://github.com/prettier/prettier) to format files.)

After using `yarn commit` a couple times and understanding the commit mesage format, you can manually create the message if you wish.

Follow the CLI prompt to complete the commit. ([Commitizen](https://github.com/commitizen/cz-cli) is used to trigger the terminal prompt for constructing the proper commit message format.)

Once pushed to the remote repository, create a Pull Request on Github to `master`. Make sure all the tests run successfully, the PR will then be reviewed by the administrator.

## Project Structure

### Apps

`/apps` Contain main user-facing applications like web frontend, api backend, & e2e tests.

- `api` is our API endpoint, composed of multiple Nest.js modules

  Access `http://localhost:3333/api/v1/Node`

- `docs` our documentation site, currently outdated
- `web` is our web entry into the application

### Libs

`/libs` contain libraries that is used by apps

- `api`: contain Nest.js modules that is imported into `/apps/api`
- `core`: contain our domain specific business logic

<!-- [Graph](libs/core/graph/README.md) -->
<!-- [Model](libs/core/model/README.md) -->
<!-- [Node](libs/core/node/README.md) -->

[Props](libs/core/props/README.md)

<!-- [Traversal](libs/core/traversal/README.md) -->
<!-- [Tree](libs/core/tree/README.md) -->

- `shared`: contain interface & other shared code, contain no external dep
- `tools`: contain ci/cd & workspace related code

## Core Concept

We conceptualize an application as a `Tree`, just as how the browser uses a Dom tree. If we can have a way of constructing the Tree, we can build the Dom tree.

## Tree Representations

There are 2 `Tree` data structures that we use. The first is thinking it like a tree, & the natural hierarchy is apparent in the data.

1. As a recursive collection of `Nodes`.

The second approach is to think about it like a `Graph`. A graph comprises of edges & vertices, where each vertex connects 2 edges.

2. As a collection of edges or vertices

#2 gives us a flat structure as there is no recursive nesting, so it is suitable for persistent storage. While #1 is a closer representation to the Dom tree, so we transform a `Graph` representation into a `Tree` representation before rendering onto the view.

### Graph Theory

A `Tree` is a specialized `Graph`, so we can use Graph Theory to help us conceptualize a Tree.

Tree `Traversal` is a common way to interact with a tree. You can configure the traversal order, and what transformations to apply to each node.
