import { AtomType, NodeI } from '@codelab/frontend'

export const configProviderData: NodeI = {
  type: AtomType.ReactConfigProvider,
  props: {
    componentSize: 'large',
  },
  children: [
    {
      type: AtomType.ReactHtmlDiv,
      children: [
        {
          type: AtomType.ReactInput,
          props: { placeholder: 'Input' },
        },
      ],
    },
    {
      type: AtomType.ReactHtmlDiv,
      children: [
        {
          type: AtomType.ReactSelect,
          props: { defaultValue: 'Demo', options: [{ value: 'Demo' }] },
        },
      ],
    },
    {
      type: AtomType.ReactHtmlDiv,
      children: [{ type: AtomType.ReactDatePicker }],
    },
    {
      type: AtomType.ReactHtmlDiv,
      children: [
        {
          type: AtomType.ReactButton,
          children: [
            {
              type: AtomType.ReactText,
              props: { value: 'Button' },
            },
          ],
        },
      ],
    },
  ],
}
