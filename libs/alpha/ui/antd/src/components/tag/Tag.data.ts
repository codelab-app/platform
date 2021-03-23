import { AtomType, NodeI } from '@codelab/frontend'

export const tagData: NodeI = {
  type: AtomType.ReactTag,
  props: { closable: true },
  children: [
    {
      type: AtomType.ReactText,
      props: {
        value: 'Tag 1',
      },
    },
  ],
}
