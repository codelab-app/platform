import type { IPropData } from '@codelab/frontend/abstract/core'
import { isServer } from '@codelab/shared/config'
import isArray from 'lodash/isArray'
import isObjectLike from 'lodash/isObjectLike'
import map from 'lodash/map'
import toPairsIn from 'lodash/toPairsIn'
import { modelTypeKey } from 'mobx-keystone'
import type { Key } from 'react'
import type { IKeyMapper, IOutput, IValueMapper } from './abstract'

const isReactNode = (obj?: IPropData) => Boolean(obj?.['$$typeof'])
const isMobxModel = (obj?: IPropData) => Boolean(obj?.[modelTypeKey])

const isHtmlNode = (obj: unknown) =>
  isServer ? false : obj instanceof HTMLElement

const isCyclic = (obj?: IPropData) =>
  (isObjectLike(obj) && isReactNode(obj)) || isMobxModel(obj) || isHtmlNode(obj)

export const mapDeep = (
  obj: IPropData,
  valueMapper: IValueMapper,
  keyMapper: IKeyMapper = (value, key) => key,
  key: Key = '',
): IOutput => {
  obj = valueMapper(obj, key) as IOutput

  return isCyclic(obj)
    ? obj
    : isArray(obj)
    ? map(obj, (innerObj, index) =>
        mapDeep(innerObj, valueMapper, keyMapper, index),
      )
    : isObjectLike(obj)
    ? toPairsIn(obj)
        .map(([_key, _value]) => {
          const mappedKey = keyMapper(_value, _key)

          const mappedValue = isObjectLike(_value)
            ? mapDeep(_value, valueMapper, keyMapper, mappedKey)
            : valueMapper(_value, _key)

          return {
            [mappedKey]: mappedValue,
          }
        })
        .reduce((acc, cur) => ({ ...acc, ...cur }), {})
    : (valueMapper(obj, '') as IPropData)
}
