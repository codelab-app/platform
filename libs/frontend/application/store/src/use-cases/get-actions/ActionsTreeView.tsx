import type { IBuilderRouteContext } from '@codelab/frontend/abstract/application'
import type { IStoreModel } from '@codelab/frontend/abstract/domain'

import { CuiEmpty, CuiTree } from '@codelab/frontend/presentation/codelab-ui'
import { observer } from 'mobx-react-lite'

import { ActionsTreeItem } from './ActionsTreeItem'

export const ActionsTreeView = observer<{
  store: IStoreModel
  context: IBuilderRouteContext
}>(({ context, store }) => {
  if (!store.actionsTree.length) {
    return <CuiEmpty />
  }

  return (
    <CuiTree
      titleRender={(data) => <ActionsTreeItem context={context} data={data} />}
      treeData={store.actionsTree}
    />
  )
})
