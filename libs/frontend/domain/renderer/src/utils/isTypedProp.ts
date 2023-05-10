import type { IPropData, TypedProp } from '@codelab/frontend/abstract/core'
import isPlainObject from 'lodash/isPlainObject'
import isString from 'lodash/isString'

export const isTypedProp = (prop: IPropData): prop is TypedProp => {
  return (
    isPlainObject(prop) &&
    'type' in prop &&
    isString(prop['type']) &&
    'value' in prop &&
    isString(prop['value'])
  )
}
