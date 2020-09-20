import { Icon } from '../icon'
import { Text } from '../text'
import { Upload } from './Upload.types'
import { NodeDtoReactI } from '@codelab/shared/interface/node'

export const uploadData: NodeDtoReactI<
  Upload.Props | Text.Props | Icon.Props
> = {
  type: 'React.Upload',
  props: {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
  },
  children: [
    {
      type: 'React.Button',
      children: [
        {
          type: 'React.Icon',
          props: {
            type: 'React.upload',
            theme: 'outlined',
          },
        },
        {
          type: 'React.Text',
          props: {
            value: ' Click to Upload',
          },
        },
      ],
    },
  ],
}
