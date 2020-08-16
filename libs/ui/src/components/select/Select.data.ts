import { ReactNodeI } from '@codelab/graph'

export const selectData: ReactNodeI = {
  type: 'Select',
  nodeType: 'React',
  props: {
    style: { width: 120 },
    defaultValue: 'a',
  },
  children: [
    {
      nodeType: 'React',
      type: 'Select.Option',
      props: {
        value: 'a',
      },
      children: [{ type: 'Text', nodeType: 'React', props: { value: 'A' } }],
    },
    {
      nodeType: 'React',
      type: 'Select.Option',
      props: {
        value: 'b',
      },
      children: [{ type: 'Text', nodeType: 'React', props: { value: 'B' } }],
    },
    {
      nodeType: 'React',
      type: 'Select.Option',
      props: {
        value: 'c',
      },
      children: [{ type: 'Text', nodeType: 'React', props: { value: 'C' } }],
    },
  ],
}
