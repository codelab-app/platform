import { ReactNodeI } from '@codelab/shared/interface/node'
import { List } from './List.types'

export const listData: ReactNodeI<
  | List.Props
  | List.PaginationProps
  | List.GridProps
  | List.ItemMetaProps
  | List.ItemProps
> = {
  type: 'List',
  nodeType: 'React',
  props: {
    header: 'Header',
    split: 'true',
    bordered: 'true',
    footer: 'Footer',
  },
  children: [
    {
      type: 'List.Item',
      nodeType: 'React',
      children: [
        {
          type: 'List.Item.Meta',
          nodeType: 'React',
          props: {
            title: 'Racing car sprays burning fuel into crowd.',
          },
        },
      ],
    },
    {
      type: 'List.Item',
      nodeType: 'React',
      children: [
        {
          type: 'List.Item.Meta',
          nodeType: 'React',
          props: {
            title: 'Japanese princess to wed commoner.',
          },
        },
      ],
    },
    {
      type: 'List.Item',
      nodeType: 'React',
      children: [
        {
          type: 'List.Item.Meta',
          nodeType: 'React',
          props: {
            title: 'Australian walks 100km after outback crash.',
          },
        },
      ],
    },
    {
      type: 'List.Item',
      nodeType: 'React',
      children: [
        {
          type: 'List.Item.Meta',
          nodeType: 'React',
          props: {
            title: 'Man charged over missing wedding girl.',
          },
        },
      ],
    },
    {
      type: 'List.Item',
      nodeType: 'React',
      children: [
        {
          type: 'List.Item.Meta',
          nodeType: 'React',
          props: {
            title: 'Los Angeles battles huge wildfires.',
          },
        },
      ],
    },
  ],
}
