import { AtomType, NodeI } from '@codelab/frontend'

export const resultData: NodeI = {
  type: AtomType.ReactResult,
  props: {
    status: 'info',
    title: 'Your operation has been executed',
    extra: {
      type: AtomType.ReactButton,
      props: { type: 'primary', key: 'console' },
      children: [
        {
          type: AtomType.ReactText,
          props: { value: 'Go Console' },
        },
      ],
    },
  },
}
