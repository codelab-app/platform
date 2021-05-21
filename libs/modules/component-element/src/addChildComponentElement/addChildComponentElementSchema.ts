import { JSONSchemaType } from 'ajv'

export type AddChildComponentElementInput = {
  atom_id: string
  parent_component_element_id: string
  component_id: string
}

export const addChildComponentElementSchema: JSONSchemaType<AddChildComponentElementInput> =
  {
    title: 'Create Component Element Input',
    type: 'object',
    properties: {
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
    required: ['atom_id', 'parent_component_element_id', 'component_id'],
  } as const
