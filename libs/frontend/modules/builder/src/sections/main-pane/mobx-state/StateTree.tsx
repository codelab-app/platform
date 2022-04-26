import { BUILDER_SERVICE, WithServices } from '@codelab/frontend/abstract/core'
import { IStateTreeNode } from '@codelab/shared/abstract/core'
import { Tree } from 'antd'
import { observer } from 'mobx-react-lite'
import { StateTreeItem } from './StateTreeItem'

type StateTreeProps = WithServices<BUILDER_SERVICE> & {
  state: Array<IStateTreeNode>
  parentPath: string
}

export const StateTree = observer<StateTreeProps>(
  ({ state, builderService }) => (
    <Tree
      blockNode
      titleRender={(node) => (
        <StateTreeItem builderService={builderService} node={node} />
      )}
      treeData={state}
    />
  ),
)
