import { AtomType, NodeI } from '@codelab/frontend'

export const treeSelectData: NodeI = {
  type: AtomType.ReactTreeSelect,
  props: {
    showSearch: true,
    style: { width: 200 },
    placeholder: 'Please select',
    treeDefaultExpandAll: true,
  },
  children: [
    {
      type: AtomType.ReactTreeNode,
      props: {
        key: 'parent 1',
        value: 'parent 1',
        title: 'parent 1',
      },
      children: [
        {
          type: AtomType.ReactTreeNode,
          props: {
            key: 'parent 1-0',
            value: 'parent 1-0',
            title: 'parent 1-0',
          },
          children: [
            {
              type: AtomType.ReactTreeNode,
              props: {
                key: 'leaf 1',
                value: 'leaf 1',
                title: 'leaf 1',
              },
            },
            {
              type: AtomType.ReactTreeNode,
              props: {
                key: 'leaf 2',
                value: 'leaf 2',
                title: 'leaf 2',
              },
            },
          ],
        },
        {
          type: AtomType.ReactTreeNode,
          props: {
            key: 'parent 1-1',
            value: 'parent 1-1',
            title: 'parent 1-1',
          },
          children: [
            {
              type: AtomType.ReactTreeNode,
              props: {
                key: 'leaf 1-1 1',
                value: 'leaf 1-1 1',
                title: 'leaf 1-1 1',
              },
            },
          ],
        },
      ],
    },
  ],
}
