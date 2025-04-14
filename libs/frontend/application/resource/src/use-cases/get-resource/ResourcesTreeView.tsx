import type {
  IResourceModel,
  IResourceNodeData,
  ITreeNode,
} from '@codelab/frontend/abstract/domain'

import { CuiTree } from '@codelab/frontend/presentation/codelab-ui'

import { ResourcesTreeItem } from './ResourcesTreeItem'

export const ResourcesTreeView = ({
  resources,
}: {
  resources: Array<IResourceModel>
}) => {
  const resourceList: Array<ITreeNode<IResourceNodeData>> = resources.map(
    (resource) => ({
      extraData: {
        node: resource,
        type: 'resource',
      },
      key: resource.id,
      primaryTitle: resource.name,
      title: resource.name,
    }),
  )

  return (
    <CuiTree
      titleRender={(node) => <ResourcesTreeItem data={node} />}
      treeData={resourceList}
    />
  )
}
