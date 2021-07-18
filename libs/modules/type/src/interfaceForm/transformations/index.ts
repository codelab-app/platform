import {
  __FieldFragment,
  __InterfaceFragment,
  __PropAggregateFragment,
} from '@codelab/codegen/graphql'
import {
  InterfaceToJsonSchemaTransformer,
  InterfaceToJsonSchemaTransformerOptions,
} from './InterfaceToJsonSchemaTransformer'
import {
  JsonObjectToUpsertValueTransformer,
  JsonObjectToUpsertValueTransformerOptions,
} from './JsonModelUpsertPropsTransformer'
import {
  PropsToJsonObjectTransformer,
  PropsToJsonObjectTransformerOptions,
} from './PropsToJsonObjectTransformer'
import { JsonObject } from './types'

export * from './InterfaceToJsonSchemaTransformer'
export * from './JsonModelUpsertPropsTransformer'
export * from './PropsToJsonObjectTransformer'
export * from './types'

// Functions for easier access:

export const propsToJsonObject = (
  props: Array<__PropAggregateFragment>,
  options: PropsToJsonObjectTransformerOptions,
): JsonObject => {
  return new PropsToJsonObjectTransformer(options).transform(props)
}

export const jsonObjectToUpsertValueInput = (
  jsonModel: JsonObject,
  fields: Array<__FieldFragment>,
  options: JsonObjectToUpsertValueTransformerOptions,
) => {
  return new JsonObjectToUpsertValueTransformer(options).transform(
    jsonModel,
    fields,
  )
}

export const interfaceToJsonSchema = (
  intface: __InterfaceFragment,
  options?: InterfaceToJsonSchemaTransformerOptions,
) => {
  return new InterfaceToJsonSchemaTransformer(options).transform(intface)
}
