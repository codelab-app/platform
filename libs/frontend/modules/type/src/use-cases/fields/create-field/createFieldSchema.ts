import { ICreateFieldDTO } from '@codelab/shared/abstract/core'
import { JSONSchemaType } from 'ajv'

export const createFieldSchema: JSONSchemaType<ICreateFieldDTO> = {
  title: 'Create Field Input',
  type: 'object',
  properties: {
    key: { type: 'string', autoFocus: true },
    name: { type: 'string', nullable: true },
    description: { type: 'string', nullable: true },
    /**
     * TODO: Refactor to match interface
     * Could somehow modify the form so we can accept an object of TypeRef, then the interface would match up better
     */
    existingTypeId: { type: 'string', nullable: true },
  },
  required: ['key', 'existingTypeId'],
}
