
# Installation

[Back](../README.md)

## Plugins to Install

1. Install [NX Console](https://marketplace.visualstudio.com/items?itemName=nrwl.angular-console), you will use the interface to run the application
2. Install [Move TS](https://marketplace.visualstudio.com/items?itemName=stringham.move-ts)
- VSCode doesn't auto update imports when renaming files, use this to help with moving files

3. Install [TypeScript Importer](https://marketplace.visualstudio.com/items?itemName=pmneo.tsimporter)
- VSCode has issues importing project reference paths

4. (Optional) Install [WebStorm](https://www.jetbrains.com/webstorm/)

- VSCode doesn't allow us to move an export (function, variable, class etc.) from one file to another, which is a huge limitation in refactoring, as this is a common procedure
- WebStorm does have this functionality, but is a paid product. They have a 30-day free trial you can try out the feature. If you find the program useful we can consider purchasing a license for you.

5. Install [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint), for realtime visual linting

## System Setup
- Fluentd
- MongoDB
- Neo4j

1. Install [Neo4j](https://neo4j.com/docs/operations-manual/current/installation)
  - Update `NEO4J_URL`, `NEO4J_USERNAME`, `NEO4J_PASSWORD` in `.env`
  - Usually is `NEO4j_URL=bolt://localhost:7687`
  - Enable APOC under Plugins in Neo4j Deskto (click 3 dots at top right of Database)
2. Install [MongoDB](https://docs.mongodb.com/manual/installation/)