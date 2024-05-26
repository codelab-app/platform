import type {
  IResourceNodeData,
  ITreeNode,
} from '@codelab/frontend/abstract/domain'
import {
  CuiSkeletonWrapper,
  CuiTree,
} from '@codelab/frontend/presentation/codelab-ui'
import { useStore } from '@codelab/frontend-application-shared-store/provider'
import { useAsync, useMountEffect } from '@react-hookz/web'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { ResourcesTreeItem } from './ResourcesTreeItem'

export const ResourcesTreeView = observer(() => {
  const { resourceService } = useStore()
  const [{ status }, getResources] = useAsync(() => resourceService.getAll())

  const resourceList: Array<ITreeNode<IResourceNodeData>> =
    resourceService.resourceList.map((resource) => ({
      extraData: {
        node: resource,
        type: 'resource',
      },
      key: resource.id,
      primaryTitle: resource.name,
      title: resource.name,
    }))

  useMountEffect(getResources.execute)

  return (
    <CuiSkeletonWrapper isLoading={status === 'loading'}>
      <CuiTree
        titleRender={(node) => {
          return <ResourcesTreeItem data={node} />
        }}
        treeData={resourceList}
      />
    </CuiSkeletonWrapper>
  )
})
