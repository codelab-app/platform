import { Transform } from 'class-transformer'
import { ValueObject } from '../core/domain/ValueObject'

export const TransformBoth = (Cls: any) => {
  /**
   * Convert to primitive
   */
  const toPlain = Transform((value) => value?.toString(), {
    toPlainOnly: true,
  })

  /**
   * Hydrate to Class
   */
  const toClass = Transform(
    (value) => {
      // If UUID is undefined, we skip transformation
      if (Cls.name === 'UUID' && value === undefined) {
        return null
      }

      return ValueObject.create(Cls, value)
    },
    {
      toClassOnly: true,
    },
  )

  return (target: any, key: string) => {
    toPlain(target, key)
    toClass(target, key)
  }
}
