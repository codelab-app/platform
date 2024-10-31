import type {
  IResourceNodeData,
  ITreeNode,
} from '@codelab/frontend/abstract/domain'

import { CuiTree } from '@codelab/frontend/presentation/codelab-ui'
import { observer } from 'mobx-react-lite'

import { useResourceService } from '../../services'
import { ResourcesTreeItem } from './ResourcesTreeItem'

export const ResourcesTreeView = observer(() => {
  const resourceService = useResourceService()

  const resourceList: Array<ITreeNode<IResourceNodeData>> = resourceService
    .getAllFromCache()
    .map((resource) => ({
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
