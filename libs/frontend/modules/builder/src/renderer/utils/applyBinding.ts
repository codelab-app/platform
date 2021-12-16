import { IPropMapBinding } from '@codelab/shared/abstract/core'
import { PropsData } from '@codelab/shared/abstract/core'
import get from 'lodash/get'
import set from 'lodash/set'

export const applyBinding = (
  targetProps: PropsData,
  sourceProps: PropsData,
  binding: IPropMapBinding,
): PropsData => {
  const isSourceKeyWildcard = binding.sourceKey === '*'
  const isTargetKeyWildcard = binding.targetKey === '*'

  const value = isSourceKeyWildcard
    ? sourceProps
    : get(sourceProps, binding.sourceKey)

  if (isTargetKeyWildcard && typeof value === 'object') {
    return { ...targetProps, ...value }
  }

  const newProps = { ...targetProps }

  set(newProps, binding.targetKey, value)

  return newProps
}
