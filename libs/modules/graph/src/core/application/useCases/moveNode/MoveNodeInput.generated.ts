export const MoveNodeInputSchema = {
  type: 'object',
  properties: {
    graphId: {
      type: 'string',
    },
    type: {
      type: 'object',
      properties: {
        source: {
          type: 'string',
        },
        target: {
          type: 'string',
        },
      },
    },
  },
  $schema: 'http://json-schema.org/draft-07/schema#',
}
