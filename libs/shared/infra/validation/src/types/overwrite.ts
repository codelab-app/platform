import type { TObject } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'

export const Overwrite = <T extends TObject, U extends TObject>(
  original: T,
  target: U,
) => {
  const targetProps = target.properties

  return Type.Composite([Type.Omit(original, Object.keys(targetProps)), target])
}
