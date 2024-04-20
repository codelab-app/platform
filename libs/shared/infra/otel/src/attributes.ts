import isObject from 'lodash/isObject'
import mapKeys from 'lodash/mapKeys'
import reduce from 'lodash/reduce'

interface PlainObject {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

export const flattenWithPrefix = (
  data: PlainObject = {},
  prefix = 'codelab',
): PlainObject => {
  // Flatten the object deeply
  const flattenObject = (obj: PlainObject, path: string = ''): PlainObject =>
    !isObject(obj)
      ? { [path.replace(/\.$/, '')]: obj }
      : reduce(
          obj,
          (cum, next, key) => ({
            ...cum,
            ...flattenObject(next, `${path}${key}.`),
          }),
          {},
        )

  const flattened = flattenObject(data)

  // Add prefix to keys
  return mapKeys(flattened, (value, key) => `${prefix}.${key}`)
}
