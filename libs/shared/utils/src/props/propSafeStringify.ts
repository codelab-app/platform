export const propSafeStringify = (props: any, maskFunctions = true) => {
  const obj: Record<string, any> = {}

  for (const k in props) {
    if (k.startsWith('_')) {
      continue
    }

    obj[k] = props[k]
  }

  const cache: Array<any> | null = []

  return JSON.stringify(
    obj,
    (k, v) => {
      if (k === 'children' && typeof v === 'object') {
        return
      }

      if (typeof v === 'object' && v !== null) {
        // Duplicate reference found, discard key
        if (cache.includes(v)) {
          return
        }

        // Store value in our collection
        cache.push(v)
      }

      if (maskFunctions && typeof v === 'function') {
        return 'function'
      }

      return v
    },
    4,
  )
}
