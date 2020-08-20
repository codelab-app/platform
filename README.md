# What is Codelab.ai

Codelab.ai is a web application builder consisting of a data modeling tool and a view binding layer. It was the only available domain extension left & has nothing to do with Artificial Intelligence, but is a likely addition in the future.

- Create models with fields & configure their relationships using a D3.js graph interface.
- Build the UI by editing the DOM Tree & configuring the components

# Built With

### Build

- [NX](https://nx.dev/react)
  - NX is a CLI toolkit for Monorepo development, similar to Angular CLI but framework agnostic
  - It scaffolds packages & provide us with a unified API for interacting with our libraries

### Frontend

- [React](https://reactjs.org)
  - A JavasScript library for building user interfaces, although we only use `.tsx`
- [Next.js](https://nextjs.org)
  - A React Framework for server-side rendering (SSR) & other performance optimizations

### Backend

- [Mongoose]()
- [Nest.js](https://nestjs.com)
  - A Node.js framework suitable for micro-services architecture, which heavily uses OOP principles such as dependency injection (DI)

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

# Plugins to Install

1. Install [NX Console](https://marketplace.visualstudio.com/items?itemName=nrwl.angular-console), you will use the interface to run the application
2. Install [Move TS](https://marketplace.visualstudio.com/items?itemName=stringham.move-ts)

- VSCode doesn't auto update imports when renaming files, use this to help with moving files

3. (Optional) Install [WebStorm](https://www.jetbrains.com/webstorm/)

- VSCode doesn't allow us to move an export (function, variable, class etc.) from one file to another, which is a huge limitation in refactoring, as this is a common procedure
- WebStorm does have this functionality, but is a paid product. They have a 30-day free trial you can try out the feature. If you find the program useful we can consider purchasing a license for you.

3. Install [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint), for realtime visual linting

The project directory structure is based on NX, with `apps` directory containing all the user facing sites, while `libs` containing all imported libraries.

# Getting Started

1. Clone a forked version of the repository
2. `cp .env.example .env.dev`
3. `yarn`

The NX Console tab has all the commands you'll need to interact with the app under the `Generate & Run Target` section. For the most part, you'll be developing with Jest & Storybook.

4. Select `Run`, which will display all commands in the format of `[package]:[command]`. Use `test` for Jest, & `storybook` for Storybook.

# CI/CD pipeline

Clone off master and create a local branch using a name that is relevant to the task in hyphenated-lowercase-or-kebab-case. Always rebase master branch before you push, so merge won't have any issues.

To commit code, run `yarn commit`. (This will trigger the git `pre-commit` hook via [Husky](https://github.com/typicode/husky), which then uses [Lint Staged](https://github.com/okonet/lint-staged) to run [ESLint](https://github.com/eslint/eslint) on staged files. ESLint will use [Prettier](https://github.com/prettier/prettier) to format files.)

After using `yarn commit` a couple times and understanding the commit mesage format, you can manually create the message if you wish.

Follow the CLI prompt to complete the commit. ([Commitizen](https://github.com/commitizen/cz-cli) is used to trigger the terminal prompt for constructing the proper commit message format.)

Once pushed to the remote repository, create a Pull Request on Github to `master`. Make sure all the tests run successfully, the PR will then be reviewed by the administrator.

<!-- # Site Documentation

For a more detailed documentation, go to the [Documentation Site](https://docs.codelab.ai) -->
