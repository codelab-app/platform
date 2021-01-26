export const AddChildNodeInputSchema = {
  type: 'object',
  properties: {
    graphId: {
      type: 'string',
    },
    type: {
      enum: [0, 1, 2],
      type: 'number',
    },
    parentVertexId: {
      type: 'string',
    },
    vertex: {
      type: 'object',
      properties: {
        type: {
          anyOf: [
            {
              enum: [
                'React_Grid',
                'React_Grid_Layout_Container',
                'React_ResponsiveGrid',
              ],
              type: 'string',
            },
            {
              type: 'null',
            },
          ],
        },
        props: {
          type: 'object',
          properties: {},
          additionalProperties: true,
        },
      },
    },
    order: {
      type: 'number',
    },
  },
  $schema: 'http://json-schema.org/draft-07/schema#',
}
