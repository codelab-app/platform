import { isObject, mapValues } from 'lodash'
import { IInput, RefSet, TransformFn } from './abstract'
import { traverseDeep } from './traverseDeep'

const traverseObjectValues = (
  obj: IInput,
  replace: TransformFn,
  _refs: RefSet,
) =>
  mapValues(obj, (value, key) =>
    // isObjects includes array too
    isObject(value)
      ? traverseDeep(value, traverseObjectValues, replace, _refs)
      : replace(value, key, obj),
  )

export const deepReplaceObjectValues = (obj: IInput, replacer: TransformFn) =>
  traverseDeep(obj, traverseObjectValues, replacer)
