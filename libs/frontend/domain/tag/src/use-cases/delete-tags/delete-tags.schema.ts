import type { JSONSchemaType } from 'ajv'

export interface DeleteTagsData {
  ids: Array<string>
}

export const deleteTagsSchema: JSONSchemaType<DeleteTagsData> = {
  properties: {
    ids: {
      autoFocus: true,
      disabled: true,
      items: {
        type: 'string',
      },
      type: 'array',
    },
  },
  required: ['ids'],
  title: 'Delete Tag Input',
  type: 'object',
}
