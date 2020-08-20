import { ReactNodeI } from '@codelab/graph'
import { PropsFromKeys } from '@codelab/props'
import { TextProps } from '../text/Text.types'

export const timelinePropKeys = ['pending', 'pendingDot', 'reverse', 'mode']

export const itemPropKeys = ['color', 'dot', 'position', 'label']

type TimelineProps = PropsFromKeys<typeof timelinePropKeys[number]>

type ItemProps = PropsFromKeys<typeof itemPropKeys[number]>

export const timelineData: ReactNodeI<TimelineProps | ItemProps | TextProps> = {
  type: 'Timeline',
  nodeType: 'React',
  children: [
    {
      type: 'Timeline.Item',
      nodeType: 'React',
      props: {},
      children: [
        {
          type: 'Text',
          nodeType: 'React',
          props: {
            value: 'Create a services site 2015-09-01',
          },
        },
      ],
    },
    {
      type: 'Timeline.Item',
      nodeType: 'React',
      props: {},
      children: [
        {
          type: 'Text',
          nodeType: 'React',
          props: {
            value: 'Solve initial network problems 2015-09-01',
          },
        },
      ],
    },
    {
      type: 'Timeline.Item',
      nodeType: 'React',
      props: {},
      children: [
        {
          type: 'Text',
          nodeType: 'React',
          props: {
            value: 'Technical testing 2015-09-01',
          },
        },
      ],
    },
    {
      type: 'Timeline.Item',
      nodeType: 'React',
      props: {},
      children: [
        {
          type: 'Text',
          nodeType: 'React',
          props: {
            value: 'Network problems being solved 2015-09-01',
          },
        },
      ],
    },
  ],
}
