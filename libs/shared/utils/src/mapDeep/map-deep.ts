import type { IPropData } from '@codelab/shared/abstract/core'
import { entries, isArray, isObjectType } from 'remeda'
import { isCyclic } from '../isCyclic'
import type { IKeyMapper, IOutput, IValueMapper, ObjectKey } from './abstract'

export const mapDeep = (
  obj: IPropData,
  valueMapper: IValueMapper,
  keyMapper: IKeyMapper = (value, key) => key,
  key: ObjectKey = '',
): IOutput => {
  if (isCyclic(obj)) {
    return obj
  }

  if (isArray(obj)) {
    return valueMapper(obj, key) as IPropData
  }

  if (isObjectType(obj)) {
    return entries(obj)
      .map(([_key, _value]) => {
        const mappedKey = keyMapper(_value, _key)

        const nestedMappedValue = mapDeep(
          _value,
          valueMapper,
          keyMapper,
          mappedKey,
        )

        return {
          [mappedKey.toString()]: nestedMappedValue,
        }
      })
      .reduce((acc, cur) => ({ ...acc, ...cur }), {})
  }

  return valueMapper(obj, key) as IPropData
}
