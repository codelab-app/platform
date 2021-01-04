import { NodeI, NodeType } from '@codelab/alpha/shared/interface/node'

export const treeData: NodeI = {
  id: 'Root',
  type: NodeType.Tree,
  children: [
    {
      id: 'A',
      type: NodeType.Tree,
      children: [
        {
          id: 'B',
          type: NodeType.Tree,
          children: [
            {
              id: 'C',
              type: NodeType.Tree,
            },
            {
              id: 'D',
              type: NodeType.Tree,
            },
          ],
        },
      ],
    },
    {
      id: 'E',
      type: NodeType.Tree,
      children: [
        {
          id: 'F',
          type: NodeType.Tree,
        },
        {
          id: 'G',
          type: NodeType.Tree,
        },
        {
          id: 'H',
          type: NodeType.Tree,
        },
      ],
    },
  ],
}
