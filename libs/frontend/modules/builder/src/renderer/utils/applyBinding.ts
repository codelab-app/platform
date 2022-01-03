import { PropMapBindingFragment } from '@codelab/frontend/modules/element'
import { get, set } from 'lodash'
import { RenderPipeProps } from '../../store'

export const applyBinding = (
  targetProps: RenderPipeProps,
  sourceProps: RenderPipeProps,
  binding: PropMapBindingFragment,
): RenderPipeProps => {
  const isSourceKeyWildcard = binding.sourceKey === '*'
  const isTargetKeyWildcard = binding.targetKey === '*'

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
