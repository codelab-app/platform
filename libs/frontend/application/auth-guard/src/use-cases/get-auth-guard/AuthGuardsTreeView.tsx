import type {
  IAuthGuardNodeData,
  ITreeNode,
} from '@codelab/frontend/abstract/domain'
import {
  CuiSkeletonWrapper,
  CuiTree,
} from '@codelab/frontend/presentation/codelab-ui'
import { useEffect } from 'react'
import { useAsyncFn } from 'react-use'
import { useAuthGuardService } from '../../services'
import { AuthGuardsTreeItem } from './AuthGuardsTreeItem'

export const AuthGuardsTreeView = () => {
  const authGuardService = useAuthGuardService()
  const [state, getAuthGuards] = useAsyncFn(() => authGuardService.getAll())

  const authGuardList: Array<ITreeNode<IAuthGuardNodeData>> =
    authGuardService.authGuardList.map((authGuard) => ({
      extraData: {
        node: authGuard,
        type: 'authGuard',
      },
      key: authGuard.id,
      primaryTitle: authGuard.name,
      title: authGuard.name,
    }))

  useEffect(() => {
    void getAuthGuards()
  }, [])

  return (
    <CuiSkeletonWrapper isLoading={state.loading}>
      <CuiTree
        titleRender={(node) => {
          return <AuthGuardsTreeItem data={node} />
        }}
        treeData={authGuardList}
      />
    </CuiSkeletonWrapper>
  )
}
