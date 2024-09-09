import { isObjectType, mapKeys, reduce } from 'remeda'

interface PlainObject {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

export const flattenWithPrefix = (
  data: PlainObject = {},
  prefix = 'codelab',
): PlainObject => {
  // Flatten the object deeply
  const flattenObject = (obj: PlainObject, path = ''): PlainObject =>
    !isObjectType(obj)
      ? { [path.replace(/\.$/, '')]: obj }
      : reduce(
          Object.entries(obj),
          (acc, [key, next]) => ({
            ...acc,
            ...flattenObject(next, `${path}${key}.`),
          }),
          {},
        )

  const flattened = flattenObject(data)

  // Add prefix to keys
  return mapKeys(flattened, (value, key) => `${prefix}.${key}`)
}
