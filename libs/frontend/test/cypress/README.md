# Register methods under `cy.`

We want to declare the interface under the global Cypress namespace. Once declared, it is loaded whenever we import the file. That is why we have import in the index.ts files for each lib. When e2e imports it will be loaded
