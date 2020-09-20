import { List } from './List.types'
import { NodeReactDtoI } from '@codelab/shared/interface/node'

export const listData: NodeReactDtoI<
  | List.Props
  | List.PaginationProps
  | List.GridProps
  | List.ItemMetaProps
  | List.ItemProps
> = {
  type: 'React.List',
  props: {
    header: 'Header',
    split: 'true',
    bordered: 'true',
    footer: 'Footer',
  },
  children: [
    {
      type: 'React.List.Item',
      children: [
        {
          type: 'React.List.Item.Meta',
          props: {
            title: 'Racing car sprays burning fuel into crowd.',
          },
        },
      ],
    },
    {
      type: 'React.List.Item',
      children: [
        {
          type: 'React.List.Item.Meta',
          props: {
            title: 'Japanese princess to wed commoner.',
          },
        },
      ],
    },
    {
      type: 'React.List.Item',
      children: [
        {
          type: 'React.List.Item.Meta',
          props: {
            title: 'Australian walks 100km after outback crash.',
          },
        },
      ],
    },
    {
      type: 'React.List.Item',
      children: [
        {
          type: 'React.List.Item.Meta',
          props: {
            title: 'Man charged over missing wedding girl.',
          },
        },
      ],
    },
    {
      type: 'React.List.Item',
      children: [
        {
          type: 'React.List.Item.Meta',
          props: {
            title: 'Los Angeles battles huge wildfires.',
          },
        },
      ],
    },
  ],
}
