import { entries, isObject } from 'lodash'
import { IInput, RefSet, TransformFn } from './abstract'
import { traverseDeep } from './traverseDeep'

const traverseObjectValuesAndKeys = (
  obj: IInput,
  replace: TransformFn,
  _refs: RefSet,
) =>
  entries(obj)
    .map(([key, value]) =>
      // isObject includes array too
      isObject(value)
        ? traverseDeep(value, traverseObjectValuesAndKeys, replace, _refs)
        : replace(value, key, obj),
    )
    .reduce((acc, current) => ({ ...acc, ...current }), {})

export const deepReplaceObjectValuesAndKeys = (
  obj: IInput,
  replacer: TransformFn,
) => traverseDeep(obj, traverseObjectValuesAndKeys, replacer)
