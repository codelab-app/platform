import type {
  IFieldNodeData,
  IStoreModel,
  ITreeNode,
} from '@codelab/frontend/abstract/domain'
import { useStore } from '@codelab/frontend/infra/mobx'
import {
  CuiEmpty,
  CuiSkeletonWrapper,
  CuiTree,
} from '@codelab/frontend/presentation/codelab-ui'
import { useAsync, useMountEffect } from '@react-hookz/web'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { StateTreeItem } from './StateTreeItem'

export const StateTreeView = observer<{ store: IStoreModel }>(({ store }) => {
  const { typeService } = useStore()

  const [{ result: type, status }, getOne] = useAsync(
    async () => (await typeService.getAll([store.api.id]))[0],
  )

  useMountEffect(getOne.execute)

  const treeData = type?.kind === 'InterfaceType' ? type.fieldsTree : []

  return (
    <CuiSkeletonWrapper isLoading={status === 'loading'}>
      {treeData.length > 0 ? (
        <CuiTree<ITreeNode<IFieldNodeData>>
          titleRender={(node) => {
            return <StateTreeItem data={node} />
          }}
          treeData={treeData}
        />
      ) : (
        <CuiEmpty />
      )}
    </CuiSkeletonWrapper>
  )
})
