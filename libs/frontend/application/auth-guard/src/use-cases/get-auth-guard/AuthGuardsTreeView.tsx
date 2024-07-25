import type {
  IAuthGuardNodeData,
  ITreeNode,
} from '@codelab/frontend/abstract/domain'
import { useStore } from '@codelab/frontend/infra/mobx'
import {
  CuiSkeletonWrapper,
  CuiTree,
} from '@codelab/frontend/presentation/codelab-ui'
import { useAsync, useMountEffect } from '@react-hookz/web'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AuthGuardsTreeItem } from './AuthGuardsTreeItem'

export const AuthGuardsTreeView = observer(() => {
  const { authGuardService } = useStore()
  const [{ status }, getAuthGuards] = useAsync(() => authGuardService.getAll())

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

  useMountEffect(getAuthGuards.execute)

  return (
    <CuiSkeletonWrapper isLoading={status === 'loading'}>
      <CuiTree
        titleRender={(node) => {
          return <AuthGuardsTreeItem data={node} />
        }}
        treeData={authGuardList}
      />
    </CuiSkeletonWrapper>
  )
})
