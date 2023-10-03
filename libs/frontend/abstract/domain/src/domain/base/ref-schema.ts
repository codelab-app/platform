import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'

/**
 * A reference to another entity.
 */
export const IRef = Type.Object({
  id: Type.String(),
})

export type IRef = Static<typeof IRef>

export const resolveRefOrThrow = <T extends IRef>(
  ref: IRef | T,
  errorFactory?: () => Error,
): T => {
  if (!ref.id || Object.keys(ref).length === 1) {
    throw errorFactory ? errorFactory() : new Error("Can't resolve ref")
  }

  return ref as T
}
