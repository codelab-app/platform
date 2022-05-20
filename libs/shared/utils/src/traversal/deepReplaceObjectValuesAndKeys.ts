import { entries, isArray, isObjectLike, merge } from 'lodash'
import { IInput, RefSet, TransformFn } from './abstract'
import { traverseDeep } from './traverseDeep'

const traverseObjectValuesAndKeys = (
  obj: IInput,
  replace: TransformFn,
  _refs: RefSet,
) =>
  entries(obj)
    .map(([key, value]) => {
      const res: any =
        isArray(value) || isObjectLike(value)
          ? traverseDeep(value, traverseObjectValuesAndKeys, replace, _refs)
          : replace(value, key, obj)

      return { [res.key]: res.value }
    })
    .reduce(merge, {})

export const deepReplaceObjectValuesAndKeys = (
  obj: IInput,
  replacer: TransformFn,
) => traverseDeep(obj, traverseObjectValuesAndKeys, replacer)
