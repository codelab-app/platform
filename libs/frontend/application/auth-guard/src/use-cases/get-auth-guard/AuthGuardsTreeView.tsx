import type {
  IAuthGuardNodeData,
  ITreeNode,
} from '@codelab/frontend/abstract/domain'

import { CuiTree } from '@codelab/frontend/presentation/codelab-ui'
import { observer } from 'mobx-react-lite'

import { useAuthGuardService } from '../../services'
import { AuthGuardsTreeItem } from './AuthGuardsTreeItem'

export const AuthGuardsTreeView = observer(() => {
  const authGuardService = useAuthGuardService()

  const authGuardList: Array<ITreeNode<IAuthGuardNodeData>> = authGuardService
    .getAllFromCache()
    .map((authGuard) => ({
      extraData: {
        node: authGuard,
        type: 'authGuard',
      },
      key: authGuard.id,
      primaryTitle: authGuard.name,
      title: authGuard.name,
    }))

  return (
    <CuiTree
      titleRender={(node) => <AuthGuardsTreeItem data={node} />}
      treeData={authGuardList}
    />
  )
})
