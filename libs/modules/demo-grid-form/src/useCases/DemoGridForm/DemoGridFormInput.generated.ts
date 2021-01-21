export const DemoGridFormInputSchema = {
  type: 'object',
  properties: {
    email1: {
      description: '{"order":1, "span": 12}',
      type: 'string',
      default: '',
    },
    password0: {
      description: '{"order":0, "span": 16}',
      type: 'string',
      default: '',
    },
    name2: {
      description: '{"order":2, "span": 8}',
      type: 'string',
      default: '',
    },
    notGroupedField: {
      type: 'string',
      default: '',
    },
  },
  $schema: 'http://json-schema.org/draft-07/schema#',
}
