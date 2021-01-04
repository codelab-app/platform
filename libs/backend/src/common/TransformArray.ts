import { Transform } from 'class-transformer'
import { ValueObject } from '@codelab/backend'

export const TransformArray = (Cls: any) => {
  const toPlain = Transform(
    (value) => {
      return value.value
    },
    {
      toPlainOnly: true,
    },
  )

  const toClass = Transform(
    (value) => {
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
