import { JSONSchemaType } from 'ajv'

export interface CreateElementSchema {
  name?: string
  parentElementId: string
  atomId: string
  componentId: string
  order?: number
}

export const createElementSchema: JSONSchemaType<CreateElementSchema> = {
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
    componentId: {
      type: 'string',
      nullable: true,
      label: 'Component',
    },
  },
  required: ['parentElementId'],
}
