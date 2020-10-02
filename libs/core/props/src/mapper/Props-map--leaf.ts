import { isPropTypeValue, propsIterator } from '@codelab/core/props'
import {
  PropItem,
  PropTypeValue,
  Props,
  PropsFactory,
} from '@codelab/shared/interface/props'

/**
 * Transform all props to `Leaf` proptype. Only works for non prop type value
 *
 * @param props
 */
export const propsMapLeaf: PropsFactory = (props: Props) =>
  propsIterator(
    props,
    (acc: Props, value: PropItem, key: keyof Props): Props => {
      if (!isPropTypeValue(value)) {
        return {
          ...acc,
          [key]: {
            __type: ['Leaf'],
            value,
          } as PropTypeValue,
        }
      }

      return {
        ...acc,
        [key]: value,
      }
    },
  )
