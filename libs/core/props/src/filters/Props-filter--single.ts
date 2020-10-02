import { propsIterator } from '../builder/Props-iterator'
import { isSingleRenderProp } from '../guards/Props-guards'
import { PropItem, Props, PropsFactory } from '@codelab/shared/interface/props'

export const propsFilterSingle: PropsFactory = (props: Props) =>
  propsIterator(props, (acc: Props, value: PropItem, key: keyof Props) => {
    if (isSingleRenderProp(value)) {
      return { ...acc, [key]: value }
    }

    return acc
  })
