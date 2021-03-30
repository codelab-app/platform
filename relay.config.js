// https://relay.dev/docs/getting-started/installation-and-setup/
module.exports = {
  // ...
  // Configuration options accepted by the `relay-compiler` command-line tool and `babel-plugin-relay`.
  src: './',
  artifactDirectory: './libs/hasura/src/__relay__',
  include: ['./apps/web/**/*'],
  schema: './schema.relay.graphql',
  extensions: ['ts', 'tsx'],
  language: 'typescript',
  exclude: [
    '**/node_modules/**',
    '**/__mocks__/**',
    '**/__generated__/**',
    '**/.next/**',
    '**/.storybook/**',
    '**/.vercel/**',
    '**/public/**',
  ],
}
