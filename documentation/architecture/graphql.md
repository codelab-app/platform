# GraphQL

We use a code-first approach with Typeorm. We define entities, which are then translated into database schema. Hasura uses Typeorm to create a GraphQL server, and generate some resolvers for us. We can also add additional resolvers using code-first Nest.js GraphQL resolvers. The schema is stitched then served at our GraphQL backend.
