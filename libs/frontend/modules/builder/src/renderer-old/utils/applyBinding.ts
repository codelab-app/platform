import { BINDING_WILDCARD } from '@codelab/frontend/abstract/core'
import { IPropMapBinding, PropsData } from '@codelab/shared/abstract/core'
import { get, isObjectLike, set } from 'lodash'

export const applyBinding = (
  targetProps: PropsData,
  sourceProps: PropsData,
  binding: IPropMapBinding,
): PropsData => {
  const isSourceKeyWildcard = binding.sourceKey === BINDING_WILDCARD
  const isTargetKeyWildcard = binding.targetKey === BINDING_WILDCARD

  const value = isSourceKeyWildcard
    ? sourceProps
    : get(sourceProps, binding.sourceKey)

  if (isTargetKeyWildcard && (value === null || isObjectLike(value))) {
    return { ...targetProps, ...value }
  }

  const newProps = targetProps

  set(newProps, binding.targetKey, value)

  return newProps
}
