import { IPropData, TypedValue } from '@codelab/frontend/abstract/core'
import isPlainObject from 'lodash/isPlainObject'

export const isTypedValue = (
  props: IPropData,
): props is TypedValue<unknown> => {
  return (
    isPlainObject(props) && 'type' in props && typeof props['type'] === 'string'
  )
}
