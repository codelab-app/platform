import { ReactNodeI } from '@codelab/graph'
import { TextProps } from '../text/Text.types'
import { IconProps } from '../icon/Icon.types'
import { UploadProps } from './Upload.types'

export const uploadData: ReactNodeI<UploadProps | TextProps | IconProps> = {
  type: 'Upload',
  nodeType: 'React',
  props: {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
  },
  children: [
    {
      type: 'Button',
      nodeType: 'React',
      children: [
        {
          type: 'Icon',
          nodeType: 'React',
          props: {
            type: 'upload',
            theme: 'outlined',
          },
        },
        {
          type: 'Text',
          nodeType: 'React',
          props: {
            value: ' Click to Upload',
          },
        },
      ],
    },
  ],
}
