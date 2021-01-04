import { propsIterator } from '../builder'
import { isPropTypeValue } from '../guards'
import {
  PropItem,
  PropType,
  PropTypeValue,
  Props,
  PropsFactory,
} from '@codelab/alpha/shared/interface/props'

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
            __type: [PropType.Leaf],
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
