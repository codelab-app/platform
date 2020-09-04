import { TreeNodeI } from '../../../node/src/codec/Node-tree'

export const treeData: TreeNodeI = {
  id: 'Root',
  nodeType: 'Tree',
  children: [
    {
      id: 'A',
      nodeType: 'Tree',
      children: [
        {
          id: 'B',
          nodeType: 'Tree',
          children: [
            {
              id: 'C',
              nodeType: 'Tree',
            },
            {
              id: 'D',
              nodeType: 'Tree',
            },
          ],
        },
      ],
    },
    {
      id: 'E',
      nodeType: 'Tree',
      children: [
        {
          id: 'F',
          nodeType: 'Tree',
        },
        {
          id: 'G',
          nodeType: 'Tree',
        },
        {
          id: 'H',
          nodeType: 'Tree',
        },
      ],
    },
  ],
}
