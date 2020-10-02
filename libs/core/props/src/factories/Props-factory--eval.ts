import { evalPropValue, isEvalProp, propsIterator } from '@codelab/core/props'
import {
  PropItem,
  PropType,
  Props,
  PropsFactory,
} from '@codelab/shared/interface/props'

type PropsFactoryEval = (parent?: Props) => PropsFactory

/**
 *
 *
 * @param renderProps These props should be made sure to be renderProps prior. These will be used as context for evaluating the props.
 */
export const propsFactoryEval: PropsFactoryEval = (renderProps: Props = {}) => (
  props: Props,
) =>
  propsIterator(props, (acc: Props, value: PropItem, key: keyof Props) => ({
    ...acc,
    ...{
      [key]: isEvalProp(value)
        ? // Transform if is eval prop
          {
            // Remove `eval` from `__type`
            __type: value.__type.filter((type) => type !== PropType.Eval),
            // Evaluate with renderProps as context
            value: evalPropValue(value, renderProps),
          }
        : // Otherwise return old value
          value,
    },
  }))
