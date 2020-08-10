import { JSONSchema7 } from 'json-schema'

export const modelJsonSchema: JSONSchema7 = {
  // title: 'User',
  // $id: '#user',
  $schema: 'http://json-schema.org/draft-07/schema#',
  type: 'object',
  properties: {
    // apps: { type: 'array', items: { $ref: '#app' } },
    models: { type: 'array', items: { $ref: '#model' } },
    // model: { $ref: '#model' },
    // field: { $ref: '#field' },
  },
  additionalProperties: false,
  definitions: {
    user: {
      $id: '#user',
      type: 'object',
      properties: {
        username: { type: 'string', uniqueItems: true },
        email: { type: 'string', uniqueItems: true },
        apps: {
          type: 'array',
          items: { $ref: '#app' },
        },
      },
    },
    app: {
      $id: '#app',
      type: 'object',
      properties: {
        title: { type: 'string', uniqueItems: true },
      },
    },
    model: {
      $id: '#model',
      type: 'object',
      properties: {
        name: { type: 'string', uniqueItems: true },
        fields: {
          type: 'array',
          items: {
            $ref: '#field',
          },
        },
      },
      required: ['name'],
      additionalProperties: false,
    },
    field: {
      $id: '#field',
      type: 'object',
      properties: {
        name: { type: 'string', uniqueItems: true },
      },
      required: ['name'],
      additionalProperties: false,
    },
  },
}
