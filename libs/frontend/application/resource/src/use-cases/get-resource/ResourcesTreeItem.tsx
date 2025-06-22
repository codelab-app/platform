import type {
  IResourceNodeData,
  ITreeNode,
} from '@codelab/frontend-abstract-domain'
import type { ToolbarItem } from '@codelab/frontend-presentation-codelab-ui'
import type { SyntheticEvent } from 'react'

import DeleteOutlined from '@ant-design/icons/DeleteOutlined'
import { RoutePaths } from '@codelab/frontend-abstract-application'
import { UiKey } from '@codelab/frontend-abstract-types'
import {
  CuiTreeItem,
  CuiTreeItemToolbar,
} from '@codelab/frontend-presentation-codelab-ui'
import { useRouter } from 'next/navigation'

import { useResourceService } from '../../services/resource.service'
import { ResourceIcon } from '../../views'

interface ResourcesTreeItemProps {
  data: ITreeNode<IResourceNodeData>
}

export const ResourcesTreeItem = ({ data }: ResourcesTreeItemProps) => {
  const router = useRouter()
  const resourceService = useResourceService()
  const resource = data.extraData.node
  const onEdit = () => router.push(RoutePaths.Resource.update(resource.id))

  const onDelete = (event: SyntheticEvent) => {
    event.stopPropagation()
    void resourceService.removeMany([data.extraData.node])
  }

  const toolbarItems: Array<ToolbarItem> = [
    {
      confirmText: `Are you sure you want to delete "${data.extraData.node.name}"?`,
      cuiKey: UiKey.ResourceToolbarItemDelete,
      icon: <DeleteOutlined />,
      onClick: onDelete,
      title: 'Delete',
    },
  ]

  return (
    <CuiTreeItem
      icon={<ResourceIcon type={resource.type} />}
      onClick={onEdit}
      primaryTitle={data.primaryTitle}
      toolbar={
        <CuiTreeItemToolbar items={toolbarItems} title="Resource toolbar" />
      }
    />
  )
}
