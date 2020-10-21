import { Text } from '../text'
import { Popconfirm } from './Popconfirm.types'
import { NodeReactI, NodeType } from '@codelab/shared/interface/node'

export const popconfirmData: NodeReactI<Popconfirm.Props | Text.Props> = {
  type: NodeType.React_Popconfirm,
  props: {
    cancelText: 'Cancel',
    okText: 'OK',
    okType: 'primary',
    title: 'Are you sure？',
  },
  children: [
    {
      type: NodeType.React_Button,
      props: {},
      children: [
        {
          type: NodeType.React_Text,
          props: {
            value: 'Delete',
          },
        },
      ],
    },
  ],
}
