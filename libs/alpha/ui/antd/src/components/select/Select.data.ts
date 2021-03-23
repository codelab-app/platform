import { AtomType, NodeI } from '@codelab/frontend'

export const selectData: NodeI = {
  type: AtomType.ReactSelect,
  props: {
    style: { width: 120 },
    defaultValue: 'a',
  },
  children: [
    {
      type: AtomType.ReactSelectOption,
      props: {
        value: 'a',
      },
      children: [{ type: AtomType.ReactText, props: { value: 'A' } }],
    },
    {
      type: AtomType.ReactSelectOption,
      props: {
        value: 'b',
      },
      children: [{ type: AtomType.ReactText, props: { value: 'B' } }],
    },
    {
      type: AtomType.ReactSelectOption,
      props: {
        value: 'c',
      },
      children: [{ type: AtomType.ReactText, props: { value: 'C' } }],
    },
  ],
}
