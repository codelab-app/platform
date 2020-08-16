import { JSONSchema7 } from 'json-schema'

export const componentSchema: JSONSchema7 = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  additionalProperties: false,
  type: 'object',
  /**
   * `properties` is similar to a Query, where we specify the name of the query & the reference to the schema
   */
  properties: {
    components: {
      type: 'array',
      items: {
        $ref: '#/definitions/component',
      },
    },
    users: {
      type: 'array',
      items: {
        $ref: '#/definitions/user',
      },
    },
  },
  /**
   * key is model name
   *
   * value is schema
   */
  definitions: {
    user: {
      type: 'object',
      properties: {
        username: { type: 'string' },
        email: { type: 'string' },
      },
    },
    // component: {
    //   type: 'object',
    //   properties: {
    //     name: { type: 'string' },
    //     props: {
    //       type: 'array',
    //       items: {
    //         $ref: '#/definitions/prop',
    //       },
    //     },
    //   },
    // },
    // prop: {
    //   type: 'object',
    //   properties: {
    //     property: { type: 'string' },
    //     description: { type: 'string' },
    //     type: { enum: ['boolean', 'string', 'number'] },
    //   },
    // },
  },
}
