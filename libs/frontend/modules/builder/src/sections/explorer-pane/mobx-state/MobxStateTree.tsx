import { IBuilderService, IStateTreeNode } from '@codelab/shared/abstract/core'
import { Tree } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { MobxStateTreeItem } from './MobxStateTreeItem'

interface StateTreeProps {
  state: Array<IStateTreeNode>
  parentPath: string
  builderService: IBuilderService
}

export const MobxStateTree = observer<StateTreeProps>(
  ({ state, builderService }) => (
    <Tree
      blockNode
      titleRender={(node) => (
        <MobxStateTreeItem
          node={node}
          open={(n) => builderService.stateModal.open(n)}
        />
      )}
      treeData={state}
    />
  ),
)
