import { PropMapBindingFragment } from '@codelab/frontend/modules/element'
import get from 'lodash/get'
import set from 'lodash/set'

export const applyBinding = (
  targetProps: Record<string, any>,
  sourceProps: Record<string, any>,
  binding: PropMapBindingFragment,
): Record<string, any> => {
  // get and set allow . and [1] expressions
  let value: any

  if (binding.sourceKey === '*') {
    value = sourceProps
  } else {
    value = get(sourceProps, binding.sourceKey)
  }

  if (binding.targetKey === '*' && typeof value === 'object') {
    return { ...targetProps, ...value }
  }

  const newProps = { ...targetProps }

  set(newProps, binding.targetKey, value)

  return newProps
}
