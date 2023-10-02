import {
  Kind,
  type TAnySchema,
  type TObject,
  type TUnion,
} from '@sinclair/typebox'

export const isUnionSchema = (
  schema: TAnySchema,
): schema is TUnion<Array<TObject>> => {
  return Kind in schema && schema[Kind] === 'Union'
}
