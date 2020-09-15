import { NodeDtoI } from '@codelab/shared/interface/node'

export const treeData: NodeDtoI = {
  id: 'Root',
  type: 'Tree',
  children: [
    {
      id: 'A',
      type: 'Tree',
      children: [
        {
          id: 'B',
          type: 'Tree',
          children: [
            {
              id: 'C',
              type: 'Tree',
            },
            {
              id: 'D',
              type: 'Tree',
            },
          ],
        },
      ],
    },
    {
      id: 'E',
      type: 'Tree',
      children: [
        {
          id: 'F',
          type: 'Tree',
        },
        {
          id: 'G',
          type: 'Tree',
        },
        {
          id: 'H',
          type: 'Tree',
        },
      ],
    },
  ],
}
