import { IUnionType } from '@codelab/shared/abstract/core'
import { schemaForTypedValue } from '../shared/schema-for-typed-value'
import { AddTypeToSchemaFn, TypeTransformFn } from '../shared/types'
import { getExtraProperties } from '../shared/utils'

export const transformUnionType: TypeTransformFn<IUnionType> = (
  type,
  options,
) => {
  // This is the extra for the union type. Not to be confused with the extra for the value type
  const extra = getExtraProperties(type, options)

  /** Create empty schema for now, we'll fill it when add children. {@link addChildToUnionType } */

  return { oneOf: [], ...extra }
}

export const addChildToUnionType: AddTypeToSchemaFn = (
  parentSchema,
  // childSchema here is the concrete type
  // (e.g. if UnionType = A | B, childSchema will be the schema for A, then for B)
  childSchema,
  { child },
) => {
  // Add the type as an oneOf option - we will render it using a custom component
  parentSchema.oneOf = parentSchema.oneOf ?? []

  const label: string | undefined = parentSchema.label
  const labelWithQuotes = label ? `"${label}" ` : ''
  const typeLabel = `${labelWithQuotes}Type`

  parentSchema.oneOf.push({
    type: 'object',
    label: '',
    typeName: child.name, // We use this as label of the select field item
    properties: schemaForTypedValue(child.id, childSchema, typeLabel),
  })
}
