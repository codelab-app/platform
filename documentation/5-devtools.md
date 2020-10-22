# Dev Tools

[Back](../README.md)

To manage our monorepo, we require a specialized tool to meet all the requirements. [NX](https://github.com/nrwl/nx) provides "Extensible Dev Tools for Monorepos" for us to manage the application. Having a dev tool like NX allows us to manage the complexity of a large codebase at scale.

## Getting Started

All `nx` commands can be run via CLI, but using a GUI provides some additional benefits.

Install `NX Console` from the VSCode Plugins tab

<img src="https://codelab.sfo2.digitaloceanspaces.com/docs/devtools/install-nx-extensions.png" width="320">

## Running code

### Serving

We provide a `yarn start` that runs everything at once, frontend & backend. But depending on what your working on, you may only want to run a subset of projects.

You can select which commands you want to run with the following command:

`nx run-many --target=serve --projects=app1,app2 --parallel --with-deps`

Simply modify the `--projects` flags

Refer to the [run-many](https://nx.dev/latest/angular/cli/overview#run-many) for more information

### Storybook, Jest

`nx` provides a shorthand for Storybook & Jest commands. These are identical...

`nx run-many --target=storybook --projects=app1`

`nx storybook app1`

and...

`nx run-many --target=test --projects=app1`

`nx test app1`

## Generating code using schematics

If you have ever used Angular.js or Nest.js, you'll have encountered their CLI tools for code generation. It can come in handy when there is a need to quickly scaffold some boilerplate code, mainly configuration files.

We are developing using a monorepo with multiple libraries, so a tool for creating libraries would be essential to scale. NX allows us to create our own schematics for generating code, we have created 2 plugins.

Select `generate` & choose the appropriate schematic for your purpose.

<img src="https://codelab.sfo2.digitaloceanspaces.com/docs/devtools/nx-generate-dropdown.png">

### `@codelab/schematics:nest-lib`

Use this to generate a Nest.js library to be imported as a Nest.js Module into a Nest.js application.

### `@codelab/schematics:react-lib`

For a React or Typescript library use this schematic.

In both cases you'll choose a `name` and a `directory`. `lib` is prepended by default to the directory path.

<img src="https://codelab.sfo2.digitaloceanspaces.com/docs/devtools/nx-generate-code.png">


