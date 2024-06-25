import type { Static, TObject } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'

export const SerializedSchema = Type.Object({
  $modelType: Type.Literal('serialized'),
})

export type ISerialized = Static<typeof SerializedSchema>

export const Serialized = <T extends TObject>(schema: T) =>
  Type.Composite([SerializedSchema, schema])
