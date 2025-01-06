import type { TObject } from '@sinclair/typebox'

import { Type } from '@sinclair/typebox'
import { ObjectTyped } from 'object-typed'

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
  const newOriginalSchema = Type.Omit(original, ObjectTyped.keys(targetProps))

  return Type.Composite([newOriginalSchema, target]) as unknown as TObject<
    Omit<T['properties'], keyof U['properties']> & U['properties']
  >
}
