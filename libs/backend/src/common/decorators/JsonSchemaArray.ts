import { Type } from '@tsed/core'
import { Schema, getJsonSchema } from '@tsed/schema'

export const JsonSchemaArray = (type: Type<any>) => {
  return Schema({
    type: 'array',
    items: {
      ...getJsonSchema(type, { customKeys: true }),
    },
  })
}
