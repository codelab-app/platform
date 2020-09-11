import { ReactNodeI } from '@codelab/shared/interface/node'
import { Text } from '../text'
import { Timeline } from './Timeline.types'

export const timelineData: ReactNodeI<
  Timeline.Props | Timeline.ItemProps | Text.Props
> = {
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
