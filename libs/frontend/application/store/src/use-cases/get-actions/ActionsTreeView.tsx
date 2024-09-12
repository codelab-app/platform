import type { IStoreModel } from '@codelab/frontend/abstract/domain'
import { CuiEmpty, CuiTree } from '@codelab/frontend/presentation/codelab-ui'
import { observer } from 'mobx-react-lite'
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
