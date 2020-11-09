# Installation

[Back](../../README.md)

## Required Installation

[Yarn](https://classic.yarnpkg.com/en/docs/install/#mac-stable)

- We use `yarn` instead of `npm`

<!-- [Git Crypt](https://github.com/AGWA/git-crypt/blob/master/INSTALL.md)

- Runs on pre-push to encrypt sensitive files in the repository -->

[NVM](https://github.com/nvm-sh/nvm)

- Use this to install correct Node.js version per package.json requirements

[Docker](https://docs.docker.com/get-docker/)

## Recommended Installation

1. Install [NX Console](https://marketplace.visualstudio.com/items?itemName=nrwl.angular-console), you will use the interface to run the application
2. Install [Move TS](https://marketplace.visualstudio.com/items?itemName=stringham.move-ts)

- VSCode doesn't auto update imports when renaming files, use this to help with moving files

3. Install [TypeScript Importer](https://marketplace.visualstudio.com/items?itemName=pmneo.tsimporter)

- VSCode has issues importing project reference paths

4. (Optional) Install [WebStorm](https://www.jetbrains.com/webstorm/)

- VSCode doesn't allow us to move an export (function, variable, class etc.) from one file to another, which is a huge limitation in refactoring, as this is a common procedure
- WebStorm does have this functionality, but is a paid product. They have a 30-day free trial you can try out the feature. If you find the program useful we can consider purchasing a license for you.

5. Install [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint), for realtime visual linting

6. Install [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
