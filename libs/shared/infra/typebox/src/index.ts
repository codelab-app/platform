import { IsUnion } from './schema/is-union'
import { Nullish } from './schema/nullish'
import { OmitOwner } from './schema/omit-owner'
import { Overwrite } from './schema/overwrite'
import { DiscriminatedRef, RefSchema, TRef } from './schema/ref'
import { Serialized } from './schema/serialized'

const Typebox = {
  DiscriminatedRef,
  IsUnion,
  Nullish,
  OmitOwner,
  Overwrite,
  RefSchema,
  Serialized,
  TRef,
}

export { Typebox }
export * from './validation'
