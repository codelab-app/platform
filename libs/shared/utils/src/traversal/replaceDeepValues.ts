import { isArray, isObjectLike, pickBy } from 'lodash'
import { IInput, RefSet, ReplaceFn, traverseDeep } from './traverseDeep'

const traverseObjectValues = (obj: IInput, replace: ReplaceFn, _refs: RefSet) =>
  pickBy(obj, (value, key) => {
    if (isArray(value)) {
      return value.map((v) => replace(v, '', v))
    }

    return isObjectLike(value)
      ? traverseDeep(value, traverseObjectValues, replace, _refs)
      : replace(value, key, obj)
  })

export const replaceDeepValues = (obj: IInput, replacer: ReplaceFn) =>
  traverseDeep(obj, traverseObjectValues, replacer, null)
