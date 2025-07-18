import type {
  IAuthGuardNodeData,
  ITreeNode,
} from '@codelab/frontend-abstract-domain'

import { useDomainStore } from '@codelab/frontend-infra-mobx-context'
import { CuiTree } from '@codelab/frontend-presentation-codelab-ui'
import { observer } from 'mobx-react-lite'

import { AuthGuardsTreeItem } from './AuthGuardsTreeItem'

export const AuthGuardsTreeView = observer(() => {
  const { authGuardDomainService } = useDomainStore()

  const authGuardList: Array<ITreeNode<IAuthGuardNodeData>> = [
    ...authGuardDomainService.authGuards.values(),
  ].map((authGuard) => ({
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
