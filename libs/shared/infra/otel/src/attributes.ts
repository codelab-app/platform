import { flatten } from 'flat'

interface PlainObject {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

export const flattenWithPrefix = (
  data: PlainObject,
  prefix = 'codelab',
): PlainObject => {
  const flattened: PlainObject = flatten(data)

  return Object.keys(flattened).reduce((obj: PlainObject, key: string) => {
    obj[`${prefix}.${key}`] = flattened[key]

    return obj
  }, {})
}
