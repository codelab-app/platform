import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import {
  type IResourcesTreeDataNode,
  resourceRef,
} from '@codelab/frontend/abstract/core'
import {
  CuiTreeItem,
  CuiTreeItemToolbar,
} from '@codelab/frontend/presentation//codelab-ui'
import { useStore } from '@codelab/frontend/presentation/container'
import React from 'react'
import { ResourceIcon } from '../../view'

interface ResourcesTreeItemProps {
  data: IResourcesTreeDataNode
}

export const ResourcesTreeItem = ({ data }: ResourcesTreeItemProps) => {
  const { resourceService } = useStore()
  const resource = data.extraData.node

  const onEdit = () => {
    resourceService.updateModal.open(resourceRef(resource.id))
  }

  const onDelete = () => {
    resourceService.deleteModal.open(resourceRef(resource.id))
  }

  const toolbarItems = [
    {
      icon: <EditOutlined />,
      key: 'edit',
      onClick: onEdit,
      title: 'Edit',
    },
    {
      icon: <DeleteOutlined />,
      key: 'delete',
      onClick: onDelete,
      title: 'Delete',
    },
  ]

  return (
    <CuiTreeItem
      icon={<ResourceIcon type={resource.type} />}
      primaryTitle={data.primaryTitle}
      toolbar={
        <CuiTreeItemToolbar items={toolbarItems} title="Resource toolbar" />
      }
    />
  )
}
