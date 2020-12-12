import { propsIterator } from '../builder'
import { isLeafRenderProp } from '../guards'
import {
  PropItem,
  Props,
  PropsFactory,
} from '@codelab/alpha/shared/interface/props'

export const propsFilterLeaf: PropsFactory = (props: Props) =>
  propsIterator(props, (acc: Props, value: PropItem, key: keyof Props) => {
    if (isLeafRenderProp(value)) {
      return { ...acc, [key]: value }
    }

    return acc
  })
