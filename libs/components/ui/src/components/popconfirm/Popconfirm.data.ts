import { ReactNodeI } from '@codelab/shared/interface/node'
import { Text } from '../text'
import { Popconfirm } from './Popconfirm.types'

export const popconfirmData: ReactNodeI<Popconfirm.Props | Text.Props> = {
  type: 'Popconfirm',
  nodeType: 'React',
  props: {
    cancelText: 'Cancel',
    okText: 'OK',
    okType: 'primary',
    title: 'Are you sure？',
  },
  children: [
    {
      type: 'Button',
      nodeType: 'React',
      props: {},
      children: [
        {
          type: 'Text',
          nodeType: 'React',
          props: {
            value: 'Delete',
          },
        },
      ],
    },
  ],
}
