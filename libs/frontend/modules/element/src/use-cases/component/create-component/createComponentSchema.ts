import { CreateComponentInput } from '@codelab/shared/abstract/codegen'
import { JSONSchemaType } from 'ajv'

export const createComponentSchema: JSONSchemaType<CreateComponentInput> = {
  title: 'Create Component Input',
  type: 'object',
  properties: {
    name: {
      autoFocus: true,
      type: 'string',
    },
    // Hide these in UI, added only to satisfy interface
    atomId: {
      type: 'string',
      nullable: true,
    },
    props: {
      type: 'string',
      nullable: true,
    },
  },
  required: ['name'],
}
