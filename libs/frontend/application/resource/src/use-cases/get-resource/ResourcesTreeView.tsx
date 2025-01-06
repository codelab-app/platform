import type {
  IResourceNodeData,
  ITreeNode,
} from '@codelab/frontend/abstract/domain'

import { CuiTree } from '@codelab/frontend/presentation/codelab-ui'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { observer } from 'mobx-react-lite'

import { useResourceService } from '../../services'
import { ResourcesTreeItem } from './ResourcesTreeItem'

export const ResourcesTreeView = observer(() => {
  const { resourceDomainService } = useDomainStore()

  const resourceList: Array<ITreeNode<IResourceNodeData>> = [
    ...resourceDomainService.resources.values(),
  ].map((resource) => ({
    extraData: {
      node: resource,
      type: 'resource',
    },
    key: resource.id,
    primaryTitle: resource.name,
    title: resource.name,
  }))

  return (
    <CuiTree
      titleRender={(node) => <ResourcesTreeItem data={node} />}
      treeData={resourceList}
    />
  )
})
