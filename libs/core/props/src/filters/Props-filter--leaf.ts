import { propsIterator } from '../builder/Props-iterator'
import { isLeafRenderProp } from '../guards/Props-guards'
import { PropItem, Props, PropsFactory } from '@codelab/shared/interface/props'

export const propsFilterLeaf: PropsFactory = (props: Props) =>
  propsIterator(props, (acc: Props, value: PropItem, key: keyof Props) => {
    if (isLeafRenderProp(value)) {
      return { ...acc, [key]: value }
    }

    return acc
  })
