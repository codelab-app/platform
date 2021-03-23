import { AtomType, NodeI } from '@codelab/frontend'

export const uploadData: NodeI = {
  type: AtomType.ReactUpload,
  props: {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
  },
  children: [
    {
      type: AtomType.ReactButton,
      children: [
        {
          type: AtomType.ReactIcon,
          props: {
            type: 'upload',
            theme: 'outlined',
          },
        },
        {
          type: AtomType.ReactText,
          props: {
            value: ' Click to Upload',
          },
        },
      ],
    },
  ],
}
