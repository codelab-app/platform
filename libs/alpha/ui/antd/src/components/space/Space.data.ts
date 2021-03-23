import { AtomType, NodeI } from '@codelab/frontend'

export const spaceData: NodeI = {
  type: AtomType.ReactSpace,
  props: {
    size: 'middle',
  },
  children: [
    {
      type: AtomType.ReactButton,
      props: { type: 'primary' },
      children: [{ type: AtomType.ReactText, props: { value: 'Primary' } }],
    },
    {
      type: AtomType.ReactButton,
      props: { type: 'default' },
      children: [{ type: AtomType.ReactText, props: { value: 'Default' } }],
    },
    {
      type: AtomType.ReactButton,
      props: { type: 'dashed' },
      children: [{ type: AtomType.ReactText, props: { value: 'Dashed' } }],
    },
  ],
}
