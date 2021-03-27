# Project Structure

[Back](../../README.md)

## Group by features

We keep each feature independent from each other, starting at the Graphql resolver. Each resolver function calls its own `UseCaseService`.

All relevant files are put under its own `useCase` folder.

## Graphql Generator

You'll see a `.graphql` file under each useCase folder. This is the input for that feature used by both our integration test, as well as the frontend.

Our generator `yarn generate:graphql` will generate graphql related files into `@codelab/generated`, which we can then import to use.

<!-- ## User Interface

A left most `navigation-tab` breaks down project into top level components.

View

- Page
  - Page List
    - Page Update
    - Page Delete
- Component
  - Component List
- Tree
  - Tree View

Model

- Data
  - Endpoint List
    - Endpoint Map/Reduce

Controller

- Data Binding
  - Bindings List
    - Bindings Details -->
