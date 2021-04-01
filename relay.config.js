// https://relay.dev/docs/getting-started/installation-and-setup/
module.exports = {
  // ...
  // Configuration options accepted by the `relay-compiler` command-line tool and `babel-plugin-relay`.
  src: './',
  include: [
    './apps/web/**/*',
    './libs/modules/**'
  ],
  // artifactDirectory: './__relay__',
  schema: './schema.relay.graphql',
  extensions: ['ts', 'tsx'],
  /**
   * Careful when installing watchman, it won't compile graphql files
   */
  watchman: false,
  language: 'typescript',
  exclude: [
    '**/__generated__/**',
    '**/.next/**',
    '**/.storybook/**',
    '**/.vercel/**',
    '**/public/**',
  ],
}
