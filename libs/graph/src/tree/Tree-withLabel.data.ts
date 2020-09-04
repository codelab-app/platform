import { TreeNodeI } from '../../../node/src/subtypes/tree/Node-tree'
/**
 * No type because nodeType doesn't exist on build tree
 */
export const treeDataWithLabel: TreeNodeI = {
  id: 'Root',
  nodeType: 'Tree',
  label: 'Root',
  children: [
    {
      id: 'A',
      nodeType: 'Tree',
      label: 'A',
      children: [
        {
          id: 'B',
          nodeType: 'Tree',
          label: 'B',
          children: [
            {
              id: 'C',
              nodeType: 'Tree',
              label: 'C',
            },
            {
              id: 'D',
              nodeType: 'Tree',
              label: 'D',
            },
          ],
        },
      ],
    },
    {
      id: 'E',
      nodeType: 'Tree',
      label: 'E',
      children: [
        {
          id: 'F',
          nodeType: 'Tree',
          label: 'F',
        },
        {
          id: 'G',
          nodeType: 'Tree',
          label: 'G',
        },
        {
          id: 'H',
          nodeType: 'Tree',
          label: 'H',
        },
      ],
    },
  ],
}
