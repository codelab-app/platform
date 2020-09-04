import { ReactNodeI } from '../../../../node/src/subtypes/react/Node-react'

export const buttonData: ReactNodeI = {
  type: 'Button',
  nodeType: 'React',
  props: {
    type: 'primary',
  },
  children: [
    {
      nodeType: 'React',
      type: 'Text',
      props: {
        value: 'Click me',
      },
    },
  ],
}
