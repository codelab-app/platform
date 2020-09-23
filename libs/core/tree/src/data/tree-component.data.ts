import { NodeI } from '@codelab/shared/interface/node'

export const componentData: NodeI = {
  id: 'root',
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
