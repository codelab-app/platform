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
  const field = FieldSchema.parse(edge)

  if (childSchema?.properties?.type && childSchema?.properties?.value) {
    // workaround for not producing correct label/input combo for typed values
    childSchema.properties.value.label = getFieldLabel(field)
  } else {
    childSchema.label = getFieldLabel(field)
  }

  parentSchema.properties[field.key] = childSchema
}
