import { IPropData, TypedValue } from '@codelab/frontend/abstract/core'
import isPlainObject from 'lodash/isPlainObject'

export const isTypedValue = (
  props: IPropData,
): props is TypedValue<unknown> => {
  if (!props) {
    return false
  }

  return (
    isPlainObject(props) && 'type' in props && typeof props['type'] === 'string'
  )
}
