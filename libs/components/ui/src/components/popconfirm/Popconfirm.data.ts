import { Text } from '../text'
import { Popconfirm } from './Popconfirm.types'
import { NodeReactDtoI } from '@codelab/shared/interface/node'

export const popconfirmData: NodeReactDtoI<Popconfirm.Props | Text.Props> = {
  type: 'React.Popconfirm',
  props: {
    cancelText: 'Cancel',
    okText: 'OK',
    okType: 'primary',
    title: 'Are you sure？',
  },
  children: [
    {
      type: 'React.Button',
      props: {},
      children: [
        {
          type: 'React.Text',
          props: {
            value: 'Delete',
          },
        },
      ],
    },
  ],
}
