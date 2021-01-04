import { propsIterator } from '../builder'
import { isRenderProp } from '../guards'
import {
  PropItem,
  Props,
  PropsFactory,
} from '@codelab/alpha/shared/interface/props'

export const propsFilterRenderProps: PropsFactory = (props: Props) =>
  propsIterator(props, (acc: Props, value: PropItem, key: keyof Props) => {
    if (isRenderProp(value)) {
      return { ...acc, [key]: value }
    }

    return acc
  })
