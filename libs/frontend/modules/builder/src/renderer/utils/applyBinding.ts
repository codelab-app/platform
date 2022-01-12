import { BINDING_WILDCARD } from '@codelab/frontend/abstract/core'
import { PropMapBindingFragment } from '@codelab/frontend/modules/element'
import { PropsData } from '@codelab/shared/abstract/core'
import { get, set } from 'lodash'

export const applyBinding = (
  targetProps: PropsData,
  sourceProps: PropsData,
  binding: PropMapBindingFragment,
): PropsData => {
  const isSourceKeyWildcard = binding.sourceKey === BINDING_WILDCARD
  const isTargetKeyWildcard = binding.targetKey === BINDING_WILDCARD

  const value = isSourceKeyWildcard
    ? sourceProps
    : get(sourceProps, binding.sourceKey)

  if (isTargetKeyWildcard && typeof value === 'object') {
    return { ...targetProps, ...value }
  }

  const newProps = targetProps

  set(newProps, binding.targetKey, value)

  return newProps
}
