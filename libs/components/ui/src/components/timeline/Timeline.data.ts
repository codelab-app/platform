import { Text } from '../text'
import { Timeline } from './Timeline.types'
import { NodeReactDtoI } from '@codelab/shared/interface/node'

export const timelineData: NodeReactDtoI<
  Timeline.Props | Timeline.ItemProps | Text.Props
> = {
  type: 'React.Timeline',
  children: [
    {
      type: 'React.Timeline.Item',
      props: {},
      children: [
        {
          type: 'React.Text',
          props: {
            value: 'Create a services site 2015-09-01',
          },
        },
      ],
    },
    {
      type: 'React.Timeline.Item',
      props: {},
      children: [
        {
          type: 'React.Text',
          props: {
            value: 'Solve initial network problems 2015-09-01',
          },
        },
      ],
    },
    {
      type: 'React.Timeline.Item',
      props: {},
      children: [
        {
          type: 'React.Text',
          props: {
            value: 'Technical testing 2015-09-01',
          },
        },
      ],
    },
    {
      type: 'React.Timeline.Item',
      props: {},
      children: [
        {
          type: 'React.Text',
          props: {
            value: 'Network problems being solved 2015-09-01',
          },
        },
      ],
    },
  ],
}
