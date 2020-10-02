/* eslint-disable no-underscore-dangle */
import { isPropTypeValue } from '../guards/Props-guards'
import { propsIterator } from '@codelab/core/props'
import {
  PropItem,
  PropType,
  PropTypeValue,
  Props,
  PropsFactory,
} from '@codelab/shared/interface/props'

/**
 * RootProps should be passed all the way down.
 * @param props
 */
// export const convertToLeafRenderProps

export const convertToLeafRenderProps: PropsFactory = (props: Props) =>
  propsIterator(props, (acc: Props, value: PropItem, key: keyof Props) => {
    if (isPropTypeValue(value)) {
      // Remove all renderProp types
      const __type = value.__type.filter(
        (type) => type !== PropType.Leaf && type !== PropType.Single,
      )

      return {
        ...acc,
        [key]: {
          // Add leaf, keep other types
          __type: [...__type, PropType.Leaf],
          value: value.value,
        },
      }
    }

    return {
      ...acc,
      [key]: {
        __type: [PropType.Leaf],
        value: value as PropTypeValue['value'],
      },
    }
  })
