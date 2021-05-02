import { JSONSchemaType } from 'ajv'

export type AddChildComponentElementInput = {
  label: string
  atom_id: string
  parent_component_element_id: string
}

export const addChildComponentElementSchema: JSONSchemaType<AddChildComponentElementInput> = {
  title: 'Create Component Element Input',
  type: 'object',
  properties: {
    parent_component_element_id: {
      type: 'string',
    },
    atom_id: {
      type: 'string',
    },
    label: {
      type: 'string',
    },
  },
  required: ['label', 'atom_id', 'parent_component_element_id'],
} as const
