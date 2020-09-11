import { ReactNodeI } from '@codelab/shared/interface/node'
import { TextProps } from '../text/Text.types'
import { PopconfirmProps } from './Popconfirm.types'

export const popconfirmData: ReactNodeI<PopconfirmProps | TextProps> = {
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
