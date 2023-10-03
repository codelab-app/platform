import type { IStoreModel } from '@codelab/frontend/abstract/core'
import { CuiEmpty, CuiTree } from '@codelab/frontend/presentation/codelab-ui'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { ActionsTreeItem } from './ActionsTreeItem'

export const ActionsTreeView = observer<{ store: IStoreModel }>(({ store }) => {
  if (!store.actionsTree.length) {
    return <CuiEmpty />
  }

  return (
    <CuiTree
      titleRender={(data) => <ActionsTreeItem data={data} />}
      treeData={store.actionsTree}
    />
  )
})
