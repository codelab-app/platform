import { TreeSelect } from './TreeSelect.types'
import { NodeDtoI } from '@codelab/shared/interface/node'

export const treeSelectData: NodeDtoI<
  TreeSelect.TreeNodeProps | TreeSelect.Props
> = {
  type: 'React.TreeSelect',
  props: {
    showSearch: true,
    style: { width: 200 },
    placeholder: 'Please select',
    treeDefaultExpandAll: true,
  },
  children: [
    {
      type: 'React.TreeNode',
      props: {
        key: 'parent 1',
        value: 'parent 1',
        title: 'parent 1',
      },
      children: [
        {
          type: 'React.TreeNode',
          props: {
            key: 'parent 1-0',
            value: 'parent 1-0',
            title: 'parent 1-0',
          },
          children: [
            {
              type: 'React.TreeNode',
              props: {
                key: 'leaf 1',
                value: 'leaf 1',
                title: 'leaf 1',
              },
            },
            {
              type: 'React.TreeNode',
              props: {
                key: 'leaf 2',
                value: 'leaf 2',
                title: 'leaf 2',
              },
            },
          ],
        },
        {
          type: 'React.TreeNode',
          props: {
            key: 'parent 1-1',
            value: 'parent 1-1',
            title: 'parent 1-1',
          },
          children: [
            {
              type: 'React.TreeNode',
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
