import { Transform } from 'class-transformer'

export const TransformBoth = (Cls: any) => {
  /**
   * Convert to primitive
   */
  const toPlain = Transform((value) => value.toString(), {
    toPlainOnly: true,
  })

  /**
   * Hydrate to Class
   */
  const toClass = Transform((value) => new Cls({ value }), {
    toClassOnly: true,
  })

  return (target: any, key: string) => {
    toPlain(target, key)
    toClass(target, key)
  }
}
