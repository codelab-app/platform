import { Tree } from 'antd'
import { observer } from 'mobx-react-lite'
import { IStateTreeNode } from '../../../renderer/utils/platformState'
import { WithBuilderService } from '../../../store/BuilderService'
import { StateTreeItem } from './StateTreeItem'

interface StateTreeProps extends WithBuilderService {
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
