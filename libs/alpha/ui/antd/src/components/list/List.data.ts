import { List } from './List.types'
import { NodeReactI, NodeType } from '@codelab/alpha/shared/interface/node'

export const listData: NodeReactI<
  | List.Props
  | List.PaginationProps
  | List.GridProps
  | List.ItemMetaProps
  | List.ItemProps
> = {
  type: NodeType.React_List,
  props: {
    header: 'Header',
    split: 'true',
    bordered: 'true',
    footer: 'Footer',
  },
  children: [
    {
      type: NodeType.React_List_Item,
      children: [
        {
          type: NodeType.React_List_Item_Meta,
          props: {
            title: 'Racing car sprays burning fuel into crowd.',
          },
        },
      ],
    },
    {
      type: NodeType.React_List_Item,
      children: [
        {
          type: NodeType.React_List_Item_Meta,
          props: {
            title: 'Japanese princess to wed commoner.',
          },
        },
      ],
    },
    {
      type: NodeType.React_List_Item,
      children: [
        {
          type: NodeType.React_List_Item_Meta,
          props: {
            title: 'Australian walks 100km after outback crash.',
          },
        },
      ],
    },
    {
      type: NodeType.React_List_Item,
      children: [
        {
          type: NodeType.React_List_Item_Meta,
          props: {
            title: 'Man charged over missing wedding girl.',
          },
        },
      ],
    },
    {
      type: NodeType.React_List_Item,
      children: [
        {
          type: NodeType.React_List_Item_Meta,
          props: {
            title: 'Los Angeles battles huge wildfires.',
          },
        },
      ],
    },
  ],
}
