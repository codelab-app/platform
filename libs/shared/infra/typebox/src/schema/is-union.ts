import {
  Kind,
  type TAnySchema,
  type TObject,
  type TSchema,
  type TUnion,
} from '@sinclair/typebox'

export const IsUnion = (
  schema: Readonly<TSchema>,
): schema is TUnion<Array<TObject>> => {
  return Kind in schema && schema[Kind] === 'Union'
}
