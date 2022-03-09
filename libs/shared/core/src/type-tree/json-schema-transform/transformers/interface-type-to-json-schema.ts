import { FieldSchema, IInterfaceType } from '@codelab/shared/abstract/core'
import { emptyObjectSchema } from '../shared/empty-object-schema'
import { getFieldLabel } from '../shared/get-field-label'
import { AddTypeToSchemaFn, TypeTransformFn } from '../shared/types'
import { getExtraProperties } from '../shared/utils'

export const interfaceTypeToJsonSchema: TypeTransformFn<IInterfaceType> = (
  type,
  options,
) => {
  const extra = getExtraProperties(type, options)

  /** Create empty schema for now, we'll fill the properties in {@link addPropertyToInterfaceSchema } */
  return { ...emptyObjectSchema(), ...extra }
}

export const addPropertyToInterfaceSchema: AddTypeToSchemaFn = (
  parentSchema,
  childSchema,
  { edge },
) => {
  console.log({ edge })

  const field = FieldSchema.parse(edge)

  // this is mutating the original schema on purpose. That way we can use the label in other places, like union types
  childSchema.label = getFieldLabel(field)
  parentSchema.properties[field.key] = childSchema
}
