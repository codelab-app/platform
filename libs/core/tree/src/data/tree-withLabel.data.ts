import { NodeI } from '@codelab/shared/interface/node'
/**
 * No type because type doesn't exist on build tree
 */
export const treeDataWithLabel: NodeI = {
  id: 'Root',
  type: 'Tree',
  props: {
    label: 'Root',
  },
  children: [
    {
      id: 'A',
      type: 'Tree',
      props: {
        label: 'A',
      },
      children: [
        {
          id: 'B',
          type: 'Tree',
          props: {
            label: 'B',
          },
          children: [
            {
              id: 'C',
              type: 'Tree',
              props: {
                label: 'C',
              },
            },
            {
              id: 'D',
              type: 'Tree',
              props: {
                label: 'D',
              },
            },
          ],
        },
      ],
    },
    {
      id: 'E',
      type: 'Tree',
      props: {
        label: 'E',
      },
      children: [
        {
          id: 'F',
          type: 'Tree',
          props: {
            label: 'F',
          },
        },
        {
          id: 'G',
          type: 'Tree',
          props: {
            label: 'G',
          },
        },
        {
          id: 'H',
          type: 'Tree',
          props: {
            label: 'H',
          },
        },
      ],
    },
  ],
}
