import { IsUnion } from './schema/is-union'
import { Nullish } from './schema/nullish'
import { OmitOwner } from './schema/omit-owner'
import { Overwrite } from './schema/overwrite'
import { DiscriminatedRef, Ref, TRef } from './schema/ref'
import { Serialized } from './schema/serialized'
import { NestedValidator } from './validation/nested-validator'

const Typebox = {
  DiscriminatedRef,
  IsUnion,
  NestedValidator,
  Nullish,
  OmitOwner,
  Overwrite,
  Ref,
  Serialized,
  TRef,
}

export { Typebox }
export * from './validation'
export * from './validator'
