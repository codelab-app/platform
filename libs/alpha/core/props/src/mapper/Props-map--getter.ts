import { propsIterator } from '../builder'
import { isPropTypeValue } from '../guards'
import {
  PropItem,
  Props,
  PropsFactory,
} from '@codelab/alpha/shared/interface/props'

/**
 * Transform all to getter style accessor, use filter before calling this function
 *
 * @param props
 */
export const propsMapGetter: PropsFactory = (props: Props) =>
  propsIterator(props, (acc: Props, value: PropItem, key: keyof Props) => {
    if (isPropTypeValue(value)) {
      return { ...acc, [key]: value.value as PropItem }
    }

    return {
      ...acc,
      [key]: value,
    }
  })
