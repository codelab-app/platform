import { ReactNodeI } from '@codelab/shared/interface/node'
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
                key: 'leaf 1',
                value: 'leaf 1',
                title: 'leaf 1',
              },
            },
            {
              type: 'TreeNode',
              nodeType: 'React',
              props: {
                key: 'leaf 2',
                value: 'leaf 2',
                title: 'leaf 2',
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
