import { CreateElementInput } from '@codelab/shared/abstract/codegen'
import { JSONSchemaType } from 'ajv'

export const createElementSchema: JSONSchemaType<CreateElementInput> = {
  title: 'Create Element Input',
  type: 'object',
  properties: {
    name: {
      autoFocus: true,
      type: 'string',
      nullable: true,
    },
    parentElementId: {
      type: 'string',
      nullable: true,
      label: 'Parent element',
    },
    order: {
      type: 'integer',
      nullable: true,
    },
    atomId: {
      type: 'string',
      nullable: true,
      label: 'Atom',
    },
    instanceOfComponentId: {
      type: 'string',
      nullable: true,
      label: 'Component',
    },
    // Added only to satisfy interface
    css: {
      type: 'string',
      nullable: true,
    },
    props: {
      type: 'string',
      nullable: true,
    },
  },
  required: [],
}
