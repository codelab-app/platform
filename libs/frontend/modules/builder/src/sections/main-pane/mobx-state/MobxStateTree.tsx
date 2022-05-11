import { BUILDER_SERVICE, WithServices } from '@codelab/frontend/abstract/core'
import { IStateTreeNode } from '@codelab/shared/abstract/core'
import { Tree } from 'antd'
import { observer } from 'mobx-react-lite'
import { MobxStateTreeItem } from './MobxStateTreeItem'

type StateTreeProps = WithServices<BUILDER_SERVICE> & {
  state: Array<IStateTreeNode>
  parentPath: string
}

export const MobxStateTree = observer<StateTreeProps>(
  ({ state, builderService }) => (
    <Tree
      blockNode
      titleRender={(node) => (
        <MobxStateTreeItem node={node} open={builderService.stateModal.open} />
      )}
      treeData={state}
    />
  ),
)
