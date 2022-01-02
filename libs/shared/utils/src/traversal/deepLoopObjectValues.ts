import { Nullable } from '@codelab/shared/abstract/types'

export const deepLoopObjectValues = (
  obj: Nullable<Record<string, any>>,
  fn: (value: any, key: string) => void,
) => {
  if (!obj) {
    return
  }

  if (typeof obj !== 'object') {
    return
  }

  if (Array.isArray(obj)) {
    obj.forEach((itemValue) => deepLoopObjectValues(itemValue, fn))

    return
  }

  const entries = Object.entries(obj)
  entries.forEach(([key, value]) => {
    fn(value, key)

    if (typeof value === 'object') {
      deepLoopObjectValues(value, fn)
    }
  })
}
