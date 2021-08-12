import { JSONSchemaType } from 'ajv'

export type OwnerInput = {
  owner: {
    email: string | null
  }
}

export const ownerDefinitions: JSONSchemaType<OwnerInput>['definitions'] = {
  owner: {
    type: 'object',
    properties: {
      email: {
        type: 'string',
        nullable: true,
      },
    },
    required: ['email'],
  },
}
