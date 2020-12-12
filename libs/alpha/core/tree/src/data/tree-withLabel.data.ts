import { NodeI, NodeType } from '@codelab/alpha/shared/interface/node'
/**
 * No type because type doesn't exist on build tree
 */
export const treeDataWithLabel: NodeI = {
  id: 'Root',
  type: NodeType.Tree,
  props: {
    label: 'Root',
  },
  children: [
    {
      id: 'A',
      type: NodeType.Tree,
      props: {
        label: 'A',
      },
      children: [
        {
          id: 'B',
          type: NodeType.Tree,
          props: {
            label: 'B',
          },
          children: [
            {
              id: 'C',
              type: NodeType.Tree,
              props: {
                label: 'C',
              },
            },
            {
              id: 'D',
              type: NodeType.Tree,
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
      type: NodeType.Tree,
      props: {
        label: 'E',
      },
      children: [
        {
          id: 'F',
          type: NodeType.Tree,
          props: {
            label: 'F',
          },
        },
        {
          id: 'G',
          type: NodeType.Tree,
          props: {
            label: 'G',
          },
        },
        {
          id: 'H',
          type: NodeType.Tree,
          props: {
            label: 'H',
          },
        },
      ],
    },
  ],
}
