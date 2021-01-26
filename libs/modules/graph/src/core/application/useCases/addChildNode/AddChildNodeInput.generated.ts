export const AddChildNodeInputSchema = {
  type: 'object',
  properties: {
    graphId: {
      type: 'string',
    },
    parentVertexId: {
      type: 'string',
    },
    vertex: {
      type: 'object',
      properties: {
        type: {
          enum: [
            'React_Grid',
            'React_Grid_Layout_Container',
            'React_ResponsiveGrid',
          ],
          type: 'string',
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
    props: {
      type: 'object',
      properties: {},
      additionalProperties: true,
    },
  },
  $schema: 'http://json-schema.org/draft-07/schema#',
}
