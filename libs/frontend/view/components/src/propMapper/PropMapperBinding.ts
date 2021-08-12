import _ from 'lodash'

export interface PropMapperBinding {
  /** The ID of the target element */
  targetElement: string

  /** The key of the prop, as received in the PropMapper */
  sourceKey: string

  /** The key of the prop, that the target Element will receive */
  targetKey: string

  // add transformer? lambda? something else to modify the prop?
}

export const applyBinding = (
  sourceProps: Record<string, any>,
  targetProps: Record<string, any>,
  binding: PropMapperBinding,
): Record<string, any> => {
  // get and set allow . and [1] expressions
  const value = _.get(sourceProps, binding.sourceKey)
  const newProps = { ...targetProps }
  _.set(newProps, binding.targetKey, value)

  return newProps
}

export const applyBindings = (
  sourceProps: Record<string, any>,
  targetProps: Record<string, any>,
  bindings: Array<PropMapperBinding>,
): Record<string, any> =>
  bindings.reduce(
    (accProps, nextBinder) => applyBinding(sourceProps, accProps, nextBinder),
    targetProps,
  )
