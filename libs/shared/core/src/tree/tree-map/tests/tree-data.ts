import { IBaseNode } from '@codelab/shared/abstract/core'

export const treeData: IBaseNode<any> = {
  id: 'Root',
  children: [
    {
      id: 'A',
      children: [
        {
          id: 'B',
          children: [
            {
              id: 'C',
            },
            {
              id: 'D',
            },
          ],
        },
      ],
    },
    {
      id: 'E',
      children: [
        {
          id: 'F',
        },
        {
          id: 'G',
        },
        {
          id: 'H',
        },
      ],
    },
  ],
}
