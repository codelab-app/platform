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
      enum: [
        'React_Grid',
        'React_Grid_Layout_Container',
        'React_ResponsiveGrid',
      ],
      type: 'string',
    },
  },
  $schema: 'http://json-schema.org/draft-07/schema#',
}
