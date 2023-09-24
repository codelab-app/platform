module.exports = {
  client: {
    service: {
      name: 'platform',
      localSchemaFile: './schema.graphql',
    },
    includes: ['./**/*.fragment.graphql', './**/*.endpoints.graphql'],
  },
}
