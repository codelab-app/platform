import type {
  IResourceNodeData,
  ITreeNode,
} from '@codelab/frontend/abstract/domain'
import {
  CuiSkeletonWrapper,
  CuiTree,
} from '@codelab/frontend/presentation/codelab-ui'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { useAsyncFn, useMount } from 'react-use'
import { useResourceService } from '../../services'
import { ResourcesTreeItem } from './ResourcesTreeItem'

export const ResourcesTreeView = observer(() => {
  const resourceService = useResourceService()
  const { resourceDomainService } = useDomainStore()
  const [{ loading }, getResources] = useAsyncFn(() => resourceService.getAll())

  const resourceList: Array<ITreeNode<IResourceNodeData>> =
    resourceDomainService.resourceList.map((resource) => ({
      extraData: {
        node: resource,
        type: 'resource',
      },
      key: resource.id,
      primaryTitle: resource.name,
      title: resource.name,
    }))

  useMount(() => {
    void getResources()
  })

  return (
    <CuiSkeletonWrapper isLoading={loading}>
      <CuiTree
        titleRender={(node) => {
          return <ResourcesTreeItem data={node} />
        }}
        treeData={resourceList}
      />
    </CuiSkeletonWrapper>
  )
})
