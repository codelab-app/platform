import type { IPropData } from '@codelab/shared-abstract-core'
import type { ObjectLike } from '@codelab/shared-abstract-types'

import { entries, isArray, isPlainObject } from 'remeda'

import type { IKeyMapper, IOutput, IValueMapper, ObjectKey } from './abstract'

import { isCyclic } from '../is-cyclic'

export const mapDeep = (
  obj: Array<IPropData> | IPropData,
  valueMapper: IValueMapper,
  keyMapper: IKeyMapper = (value, key) => key,
  key: ObjectKey = '',
): IOutput => {
  obj = valueMapper(obj, key) as IOutput

  if (isCyclic(obj)) {
    return obj
  }

  if (isArray(obj)) {
    return obj.map((innerObj, index) =>
      mapDeep(innerObj as IPropData, valueMapper, keyMapper, index),
    )
  }

  if (isPlainObject(obj)) {
    return entries(obj)
      .map(([_key, _value]) => {
        const mappedKey = keyMapper(_value, _key)
        let mappedValue

        if (isPlainObject(_value) || isArray(_value)) {
          mappedValue = mapDeep(_value, valueMapper, keyMapper, mappedKey)
        } else {
          mappedValue = valueMapper(_value, _key)
        }

        return {
          [mappedKey.toString()]: mappedValue,
        }
      })
      .reduce((acc, cur: ObjectLike) => ({ ...acc, ...cur }), {})
  }

  return obj
}
