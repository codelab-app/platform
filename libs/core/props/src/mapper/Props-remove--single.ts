import { isSingleRenderProp, propsIterator } from '@codelab/core/props'
import {
  PropItem,
  PropType,
  Props,
  PropsFactory,
} from '@codelab/shared/interface/props'

export const propsRemoveSingle: PropsFactory = (props: Props) =>
  propsIterator(props, (acc: Props, value: PropItem, key: keyof Props) => {
    if (isSingleRenderProp(value)) {
      return {
        ...acc,
        [key]: {
          __type: value.__type.filter((type) => type !== PropType.Single),
          value: value.value,
        },
      }
    }

    return {
      ...acc,
      [key]: value,
    }
  })
