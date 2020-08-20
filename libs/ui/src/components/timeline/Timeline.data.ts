import { ReactNodeI } from '@codelab/graph'
import { TextProps } from '../text/Text.types'
import { TimelineProps, ItemProps } from './Timeline.types'

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
