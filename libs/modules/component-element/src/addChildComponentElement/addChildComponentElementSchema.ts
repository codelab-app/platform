import { JSONSchemaType } from 'ajv'

export type AddChildComponentElementInput = {
  label: string
  atom_id: string
  parent_component_element_id: string
  component_id: string
}

export const addChildComponentElementSchema: JSONSchemaType<AddChildComponentElementInput> = {
  title: 'Create Component Element Input',
  type: 'object',
  properties: {
    label: {
      type: 'string',
    },
    atom_id: {
      type: 'string',
    },
    parent_component_element_id: {
      type: 'string',
    },
    component_id: {
      type: 'string',
    },
  },
  required: ['label', 'atom_id', 'parent_component_element_id', 'component_id'],
} as const
