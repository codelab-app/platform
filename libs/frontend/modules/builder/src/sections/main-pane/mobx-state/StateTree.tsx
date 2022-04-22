import { Tree } from 'antd'
import { observer } from 'mobx-react-lite'
import { IStateTreeNode } from '../../../renderer/utils/platformState'
import { StateTreeItem } from './StateTreeItem'

interface StateTreeProps {
  state: Array<IStateTreeNode>
  parentPath: string
}

export const StateTree = observer<StateTreeProps>(({ state }) => (
  <Tree
    blockNode
    titleRender={(node) => <StateTreeItem node={node} />}
    treeData={state}
  />
))
