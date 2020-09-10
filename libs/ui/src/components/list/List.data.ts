import { ReactNodeI } from '@codelab/shared/interface/node'
import {
  ListProps,
  PaginationProps,
  GridProps,
  ItemProps,
  MetaProps,
} from './List.types'

export const listData: ReactNodeI<
  ListProps | PaginationProps | GridProps | ItemProps | MetaProps
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
