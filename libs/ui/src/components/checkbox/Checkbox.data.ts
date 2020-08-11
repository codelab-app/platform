import { ReactNodeI } from '../../../../graph/src/node/codec/Node-react'

export const checkboxData: ReactNodeI = {
  type: 'Checkbox',
  nodeType: 'React',
  children: [
    {
      type: 'Text',
      nodeType: 'React',
      props: {
        value: 'Checkbox',
      },
    },
  ],
}
