import DeleteOutlined from '@ant-design/icons/DeleteOutlined'
import type {
  IResourceNodeData,
  ITreeNode,
} from '@codelab/frontend/abstract/domain'
import { UiKey } from '@codelab/frontend/abstract/types'
import type { ToolbarItem } from '@codelab/frontend/presentation/codelab-ui'
import {
  CuiTreeItem,
  CuiTreeItemToolbar,
} from '@codelab/frontend/presentation/codelab-ui'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { ResourceIcon } from '../../views'
import { useDeleteResourceModal } from '../delete-resource/delete-resource.state'
import { useUpdateResourceForm } from '../update-resource'

interface ResourcesTreeItemProps {
  data: ITreeNode<IResourceNodeData>
}

export const ResourcesTreeItem = observer(
  ({ data }: ResourcesTreeItemProps) => {
    const updateResourceForm = useUpdateResourceForm()
    const resource = data.extraData.node
    const deleteResourceModal = useDeleteResourceModal()

    const onEdit = () => {
      updateResourceForm.open(resource)
    }

    const onDelete = () => {
      deleteResourceModal.open(resource)
    }

    const toolbarItems: Array<ToolbarItem> = [
      {
        cuiKey: UiKey.DeleteResourceToolbarItem,
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
  },
)
