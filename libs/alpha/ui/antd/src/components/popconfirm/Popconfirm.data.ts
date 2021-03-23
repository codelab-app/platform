import { AtomType, NodeI } from '@codelab/frontend'

export const popconfirmData: NodeI = {
  type: AtomType.ReactPopconfirm,
  props: {
    cancelText: 'Cancel',
    okText: 'OK',
    okType: 'primary',
    title: 'Are you sure？',
  },
  children: [
    {
      type: AtomType.ReactButton,
      props: {},
      children: [
        {
          type: AtomType.ReactText,
          props: {
            value: 'Delete',
          },
        },
      ],
    },
  ],
}
