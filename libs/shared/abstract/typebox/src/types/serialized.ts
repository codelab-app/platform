import type { Static, TObject } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'

export const ISerialized = Type.Object({
  $modelType: Type.Literal('serialized'),
})

export type ISerialized = Static<typeof ISerialized>

export const Serialized = <T extends TObject>(schema: T) =>
  Type.Composite([ISerialized, schema])
