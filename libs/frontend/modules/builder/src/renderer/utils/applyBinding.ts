import { PropMapBindingFragment } from '@codelab/frontend/modules/element'
import { get, isObjectLike, merge, set } from 'lodash'
import { RenderProps } from '../../store'

export const applyBinding = (
  targetProps: RenderProps,
  sourceProps: RenderProps,
  binding: PropMapBindingFragment,
): RenderProps => {
  const isSourceKeyWildcard = binding.sourceKey === '*'
  const isTargetKeyWildcard = binding.targetKey === '*'

  const value = isSourceKeyWildcard
    ? sourceProps
    : get(sourceProps, binding.sourceKey)

  if (isTargetKeyWildcard && isObjectLike(value)) {
    return merge(targetProps, value)
  }

  const newProps = targetProps

  set(newProps, binding.targetKey, value)

  return newProps
}
