import type { TObject } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'

/**
 * Overwrite({ a: string, b: number }, { b: string })
 * ->
 * { a: string, b: string }
 *
 * @param original
 * @param target
 * @returns
 */
export const Overwrite = <T extends TObject, U extends TObject>(
  original: T,
  target: U,
) => {
  const targetProps = target.properties
  const newOriginal = Type.Omit(original, Object.keys(targetProps))

  return Type.Composite([newOriginal, target]) as unknown as TObject<
    Omit<T['properties'], keyof U['properties']> & U['properties']
  >
}
