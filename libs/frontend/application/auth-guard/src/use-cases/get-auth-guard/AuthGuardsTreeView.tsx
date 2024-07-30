import type {
  IAuthGuardNodeData,
  ITreeNode,
} from '@codelab/frontend/abstract/domain'
import {
  CuiSkeletonWrapper,
  CuiTree,
} from '@codelab/frontend/presentation/codelab-ui'
import { useAsync, useMountEffect } from '@react-hookz/web'
import React from 'react'
import { useAuthGuardService } from '../../services'
import { AuthGuardsTreeItem } from './AuthGuardsTreeItem'

export const AuthGuardsTreeView = () => {
  const authGuardService = useAuthGuardService()
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
}
