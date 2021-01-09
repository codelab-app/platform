export const LoginUserInputSchema = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
    },
    password: {
      type: 'string',
    },
  },
  $schema: 'http://json-schema.org/draft-07/schema#',
}
