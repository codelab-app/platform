import { Text } from '../text'
import { Timeline } from './Timeline.types'
import { NodeReactI, NodeType } from '@codelab/shared/interface/node'

export const timelineData: NodeReactI<
  Timeline.Props | Timeline.ItemProps | Text.Props
> = {
  type: NodeType.React_Timeline,
  children: [
    {
      type: NodeType.React_Timeline_Item,
      props: {},
      children: [
        {
          type: NodeType.React_Text,
          props: {
            value: 'Create a services site 2015-09-01',
          },
        },
      ],
    },
    {
      type: NodeType.React_Timeline_Item,
      props: {},
      children: [
        {
          type: NodeType.React_Text,
          props: {
            value: 'Solve initial network problems 2015-09-01',
          },
        },
      ],
    },
    {
      type: NodeType.React_Timeline_Item,
      props: {},
      children: [
        {
          type: NodeType.React_Text,
          props: {
            value: 'Technical testing 2015-09-01',
          },
        },
      ],
    },
    {
      type: NodeType.React_Timeline_Item,
      props: {},
      children: [
        {
          type: NodeType.React_Text,
          props: {
            value: 'Network problems being solved 2015-09-01',
          },
        },
      ],
    },
  ],
}
