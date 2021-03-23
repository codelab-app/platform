import { AtomType, NodeI } from '@codelab/frontend'

export const checkboxData: NodeI = {
  type: AtomType.ReactCheckbox,
  props: {
    autoFocus: false,
  },
  children: [
    {
      type: AtomType.ReactText,
      props: {
        value: 'Checkbox',
      },
    },
  ],
}
