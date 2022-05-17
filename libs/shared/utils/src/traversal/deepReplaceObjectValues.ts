import { Nullish } from '@codelab/shared/abstract/types'
import { entries, isArray, isObjectLike, merge } from 'lodash'

const shouldSkip = (obj: any, _refs: WeakSet<any>) =>
  !obj ||
  // isNotObject
  typeof obj !== 'object' ||
  /**
   *
   * some circular objects we know they exists
   *  isReactObject
   *  isMobxModel
   *  isHtmlElement
   *
   * */
  Boolean(obj['$$typeof']) ||
  Boolean(obj['$modelType']) ||
  obj instanceof HTMLElement ||
  /**
   *
   * other circular objects
   *
   * */
  // isVisited
  _refs.has(obj)

export const deepReplaceObjectValues = (
  obj: any,
  replacer: (value: any, key: string, innerObj: any) => any,
  _refs: Nullish<WeakSet<any>> = null,
): any => {
  if (!_refs) {
    _refs = new WeakSet()
  }

  if (shouldSkip(obj, _refs)) {
    return obj
  }

  _refs.add(obj)

  if (isArray(obj)) {
    return obj.map((e) => deepReplaceObjectValues(e, replacer, _refs))
  }

  obj = replacer(obj, '', obj)

  if (shouldSkip(obj, new WeakSet())) {
    return obj
  }

  if (isArray(obj)) {
    return obj.map((e) => deepReplaceObjectValues(e, replacer, _refs))
  }

  return entries(obj)
    .map(([key, value]) => {
      if (isArray(value)) {
        value = value.map((v, index) => replacer(v, `${key}.${index}`, v))
      } else if (isObjectLike(value)) {
        value = deepReplaceObjectValues(value, replacer, _refs)
      } else {
        value = replacer(value, key, obj)
      }

      return { [key]: value }
    })
    .reduce(merge, {})
}
