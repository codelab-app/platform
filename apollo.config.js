// Used only for VSCode plugin as syntax support
module.exports = {
  client: {
    service: {
      name: 'codelab',
      localSchemaFile: './schema.graphql',
    },
    includes: ['./**/*.fragment.graphql', './**/*.endpoints.graphql'],
  },
}
