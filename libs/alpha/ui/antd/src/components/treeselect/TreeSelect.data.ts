import { TreeSelect } from './TreeSelect.types'
import { NodeReactI, NodeType } from '@codelab/alpha/shared/interface/node'

export const treeSelectData: NodeReactI<
  TreeSelect.TreeNodeProps | TreeSelect.Props
> = {
  type: NodeType.React_TreeSelect,
  props: {
    showSearch: true,
    style: { width: 200 },
    placeholder: 'Please select',
    treeDefaultExpandAll: true,
  },
  children: [
    {
      type: NodeType.React_TreeNode,
      props: {
        key: 'parent 1',
        value: 'parent 1',
        title: 'parent 1',
      },
      children: [
        {
          type: NodeType.React_TreeNode,
          props: {
            key: 'parent 1-0',
            value: 'parent 1-0',
            title: 'parent 1-0',
          },
          children: [
            {
              type: NodeType.React_TreeNode,
              props: {
                key: 'leaf 1',
                value: 'leaf 1',
                title: 'leaf 1',
              },
            },
            {
              type: NodeType.React_TreeNode,
              props: {
                key: 'leaf 2',
                value: 'leaf 2',
                title: 'leaf 2',
              },
            },
          ],
        },
        {
          type: NodeType.React_TreeNode,
          props: {
            key: 'parent 1-1',
            value: 'parent 1-1',
            title: 'parent 1-1',
          },
          children: [
            {
              type: NodeType.React_TreeNode,
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
