import { TreeNodeI } from '@codelab/shared/interface/node'

export const componentData: TreeNodeI = {
  id: 'root',
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
