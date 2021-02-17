import { Type } from '@tsed/core'
import { CustomKey, getJsonSchema } from '@tsed/schema'

export const JsonSchemaTypeDependencies = (types: Array<Type<any>>) => {
  return CustomKey('dependencies', {
    type: {
      oneOf: types.map((type) => getJsonSchema(type)),
    },
  })
}
