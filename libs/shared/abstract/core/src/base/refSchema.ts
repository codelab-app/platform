import { z } from 'zod'

/**
 * A reference to another entity.
 */
export const refSchema = z.object({
  id: z.string(),
})

export type IRef = z.infer<typeof refSchema>

export const resolveRefOrThrow = <T extends IRef>(
  ref: IRef | T,
  errorFactory?: () => Error,
): T => {
  if (!ref || !ref.id || Object.keys(ref).length === 1) {
    throw errorFactory ? errorFactory() : new Error("Can't resolve ref")
  }

  return ref as T
}
