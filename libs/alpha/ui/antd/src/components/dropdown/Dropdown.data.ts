import { AtomType, NodeI } from '@codelab/frontend'

export const dropdownData: NodeI = {
  type: AtomType.ReactDropdown,
  props: {
    overlay: {
      type: AtomType.ReactMenu,
      props: { style: { width: 120 } },
      children: [
        {
          type: AtomType.ReactMenuItem,
          props: {
            key: '1',
          },
          children: [
            {
              type: AtomType.ReactText,
              props: {
                value: 'Option 1',
              },
            },
          ],
        },
        {
          type: AtomType.ReactMenuItem,
          props: {
            key: '2',
          },
          children: [
            {
              type: AtomType.ReactText,
              props: {
                value: 'Option 2',
              },
            },
          ],
        },
      ],
    },
  },
  children: [
    {
      type: AtomType.ReactHtmlA,
      children: [
        {
          type: AtomType.ReactText,
          props: {
            value: 'Hover me',
          },
        },
      ],
    },
  ],
}
