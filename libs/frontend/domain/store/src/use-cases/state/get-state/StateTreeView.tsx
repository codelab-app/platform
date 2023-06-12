import type { IStore, StateTreeDataNode } from '@codelab/frontend/abstract/core'
import {
  CuiSkeletonWrapper,
  CuiTree,
} from '@codelab/frontend/presentation//codelab-ui'
import { useStore } from '@codelab/frontend/presentation/container'
import { useAsync, useMountEffect } from '@react-hookz/web'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { StateTreeItem } from './StateTreeItem'

export const StateTreeView = observer<{ store: IStore }>(({ store }) => {
  const { typeService } = useStore()

  const [{ error, result: type, status }, getOne] = useAsync(
    async () => (await typeService.getAll([store.api.id]))[0],
  )

  useMountEffect(getOne.execute)

  const treeData = type?.kind === 'InterfaceType' ? type.fieldsTree : []

  return (
    <CuiSkeletonWrapper isLoading={status === 'loading'}>
      {treeData.length > 0 ? (
        <CuiTree<StateTreeDataNode>
          titleRender={(node) => {
            return <StateTreeItem data={node} />
          }}
          treeData={treeData}
        />
      ) : (
        'No fields to show'
      )}
    </CuiSkeletonWrapper>
  )
})
