import { ReactNodeI } from '@codelab/shared/interface/node'
import { Text } from '../text'
import { Icon } from '../icon'
import { Upload } from './Upload.types'

export const uploadData: ReactNodeI<Upload.Props | Text.Props | Icon.Props> = {
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
