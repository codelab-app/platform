import type { IStore } from '@codelab/frontend/abstract/core'
import { CuiTree } from '@codelab/frontend/presentation//codelab-ui'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { ActionsTreeItem } from './ActionsTreeItem'

export const ActionsTreeView = observer<{ store: IStore }>(({ store }) => (
  <CuiTree
    titleRender={(data) => <ActionsTreeItem data={data} />}
    treeData={store.actionsTree}
  />
))
