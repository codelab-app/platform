// Used only for VSCode plugin as syntax support
module.exports = {
  client: {
    service: {
      name: 'platform',
      localSchemaFile: './schema.graphql',
    },
    includes: ['./**/*.fragment.graphql', './**/*.endpoints.graphql'],
  },
}
