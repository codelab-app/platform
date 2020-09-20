import { Tree } from './Tree.types'
import { NodeReactDtoI } from '@codelab/shared/interface/node'

export const treeData: NodeReactDtoI<Tree.Props | Tree.TreeNodeProps> = {
  type: 'React.Tree',
  props: {
    checkable: true,
    treeData: [
      {
        title: 'parent 1',
        key: '0-0',
        children: [
          {
            title: 'parent 1-0',
            key: '0-0-0',
            disabled: true,
            children: [
              {
                title: 'leaf 1',
                key: '0-0-0-0',
                disableCheckbox: true,
              },
              {
                title: 'leaf 2',
                key: '0-0-0-1',
              },
            ],
          },
          {
            title: 'parent 1-1',
            key: '0-0-1',
            children: [
              {
                title: 'sss',
                key: '0-0-1-0',
              },
            ],
          },
        ],
      },
    ],
    defaultExpandedKeys: ['0-0-0', '0-0-1'],
    defaultCheckedKeys: ['0-0-0', '0-0-0-1'],
  },
}
