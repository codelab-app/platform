import isArray from 'lodash/isArray'
import isObjectLike from 'lodash/isObjectLike'
import map from 'lodash/map'
import toPairsIn from 'lodash/toPairsIn'
import { isServer } from '../env'
import { IInput, IKeyMapper, IOutput, IValueMapper, Key } from './abstract'

const isReactNode = (obj: IInput) => Boolean(obj['$$typeof'])
const isMobxModel = (obj: IInput) => Boolean(obj['$modelType'])

const isHtmlNode = (obj: IInput) =>
  isServer ? false : obj instanceof HTMLElement

const isCyclic = (obj: IInput) =>
  isReactNode(obj) || isMobxModel(obj) || isHtmlNode(obj)

export const mapDeep = (
  obj: IInput,
  valueMapper: IValueMapper,
  keyMapper: IKeyMapper = (v, k) => k,
  key: Key = '',
): IOutput => {
  obj = valueMapper(obj, key)

  return !obj || isCyclic(obj)
    ? obj
    : isArray(obj)
    ? map(obj, (innerObj, index) =>
        mapDeep(innerObj, valueMapper, keyMapper, index),
      )
    : isObjectLike(obj)
    ? toPairsIn(obj)
        .map(([k, v]) => {
          const mappedKey = keyMapper(v, k)

          const mappedValue = isObjectLike(v)
            ? mapDeep(v, valueMapper, keyMapper, mappedKey)
            : valueMapper(v, k)

          return {
            [mappedKey]: mappedValue,
          }
        })
        .reduce((acc, c) => ({ ...acc, ...c }), {})
    : valueMapper(obj, '')
}
