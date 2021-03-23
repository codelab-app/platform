import { AtomType, NodeI } from '@codelab/frontend'

export const listData: NodeI = {
  type: AtomType.ReactList,
  props: {
    header: 'Header',
    split: 'true',
    bordered: 'true',
    footer: 'Footer',
  },
  children: [
    {
      type: AtomType.ReactListItem,
      children: [
        {
          type: AtomType.ReactListItemMeta,
          props: {
            title: 'Racing car sprays burning fuel into crowd.',
          },
        },
      ],
    },
    {
      type: AtomType.ReactListItem,
      children: [
        {
          type: AtomType.ReactListItemMeta,
          props: {
            title: 'Japanese princess to wed commoner.',
          },
        },
      ],
    },
    {
      type: AtomType.ReactListItem,
      children: [
        {
          type: AtomType.ReactListItemMeta,
          props: {
            title: 'Australian walks 100km after outback crash.',
          },
        },
      ],
    },
    {
      type: AtomType.ReactListItem,
      children: [
        {
          type: AtomType.ReactListItemMeta,
          props: {
            title: 'Man charged over missing wedding girl.',
          },
        },
      ],
    },
    {
      type: AtomType.ReactListItem,
      children: [
        {
          type: AtomType.ReactListItemMeta,
          props: {
            title: 'Los Angeles battles huge wildfires.',
          },
        },
      ],
    },
  ],
}
