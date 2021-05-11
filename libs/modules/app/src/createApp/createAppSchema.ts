import { JSONSchemaType } from 'ajv'

export type CreateAppInput = {
  name: string
}
// & OwnerInput

export const createAppSchema: JSONSchemaType<CreateAppInput> = {
  title: 'Create App Input',
  type: 'object',
  properties: {
    // owner: { $ref: '#/definitions/owner' },
    name: {
      type: 'string',
    },
  },
  required: ['name'],
  // definitions: {
  //   ...ownerDefinitions,
  // },
}
