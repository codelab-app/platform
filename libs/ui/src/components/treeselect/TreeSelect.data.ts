import { ReactNodeI } from '@codelab/graph'
import { TreeNodeProps, TreeSelectProps } from './TreeSelect.types'

export const treeSelectData: ReactNodeI<TreeNodeProps | TreeSelectProps> = {
  type: 'TreeSelect',
  nodeType: 'React',
  props: {
    showSearch: true,
    style: { width: 200 },
    placeholder: 'Please select',
    treeDefaultExpandAll: true,
  },
  children: [
    {
      type: 'TreeNode',
      nodeType: 'React',
      props: {
        key: 'parent 1',
        value: 'parent 1',
        title: 'parent 1',
      },
      children: [
        {
          type: 'TreeNode',
          nodeType: 'React',
          props: {
            key: 'parent 1-0',
            value: 'parent 1-0',
            title: 'parent 1-0',
          },
          children: [
            {
              type: 'TreeNode',
              nodeType: 'React',
              props: {
                key: 'leaf1',
                value: 'leaf1',
                title: 'leaf1',
              },
            },
            {
              type: 'TreeNode',
              nodeType: 'React',
              props: {
                key: 'leaf2',
                value: 'leaf2',
                title: 'leaf2',
              },
            },
          ],
        },
        {
          type: 'TreeNode',
          nodeType: 'React',
          props: {
            key: 'parent 1-1',
            value: 'parent 1-1',
            title: 'parent 1-1',
          },
          children: [
            {
              type: 'TreeNode',
              nodeType: 'React',
              props: {
                key: 'sss',
                value: 'sss',
                title: 'sss',
              },
            },
          ],
        },
      ],
    },
  ],
}
