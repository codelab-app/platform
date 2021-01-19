export const DemoGridFormInputSchema = {
  type: 'object',
  properties: {
    email1: {
      description: '{"order":1, "span": 12}',
      type: 'string',
    },
    password0: {
      description: '{"order":0, "span": 16}',
      type: 'string',
    },
    name2: {
      description: '{"order":2, "span": 8}',
      type: 'string',
    },
    notGroupedField: {
      type: 'string',
    },
    groupedField: {
      type: 'object',
      properties: {
        test1: {
          description: '{"order":1, "span": 4}',
          type: 'string',
        },
        test2: {
          description: '{"order":0, "span": 12}',
          type: 'string',
        },
      },
    },
  },
  $schema: 'http://json-schema.org/draft-07/schema#',
}
