import { Icon } from '../icon'
import { Text } from '../text'
import { Upload } from './Upload.types'
import { NodeReactI, NodeType } from '@codelab/alpha/shared/interface/node'

export const uploadData: NodeReactI<Upload.Props | Text.Props | Icon.Props> = {
  type: NodeType.React_Upload,
  props: {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
  },
  children: [
    {
      type: NodeType.React_Button,
      children: [
        {
          type: NodeType.React_Icon,
          props: {
            type: 'upload',
            theme: 'outlined',
          },
        },
        {
          type: NodeType.React_Text,
          props: {
            value: ' Click to Upload',
          },
        },
      ],
    },
  ],
}
