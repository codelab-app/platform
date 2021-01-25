export const UpdateNodeInputSchema = {
  type: 'object',
  properties: {
    graphId: {
      type: 'string',
    },
    vertexId: {
      type: 'string',
    },
    type: {
      type: 'string',
    },
  },
  $schema: 'http://json-schema.org/draft-07/schema#',
}
