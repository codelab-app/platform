import { JSONSchemaType } from 'ajv'

export type DeleteTagsData = {
  ids: Array<string>
}

export const deleteTagsSchema: JSONSchemaType<DeleteTagsData> = {
  title: 'Delete Tag Input',
  type: 'object',
  properties: {
    ids: {
      type: 'array',
      items: {
        type: 'string',
      },
      disabled: true,
      autoFocus: true,
    },
  },
  required: ['ids'],
}
