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
  },
  $schema: 'http://json-schema.org/draft-07/schema#',
}
