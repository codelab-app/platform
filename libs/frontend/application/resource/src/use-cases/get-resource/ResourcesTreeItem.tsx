import DeleteOutlined from '@ant-design/icons/DeleteOutlined'
import type {
  IResourceNodeData,
  ITreeNode,
} from '@codelab/frontend/abstract/domain'
import { resourceRef } from '@codelab/frontend/abstract/domain'
import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import type { ToolbarItem } from '@codelab/frontend/presentation/codelab-ui'
import {
  CuiTreeItem,
  CuiTreeItemToolbar,
} from '@codelab/frontend/presentation/codelab-ui'
import { useStore } from '@codelab/frontend-application-shared-store/provider'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { ResourceIcon } from '../../views'
import { useDeleteResourceModal } from '../delete-resource/delete-resource.state'

interface ResourcesTreeItemProps {
  data: ITreeNode<IResourceNodeData>
}

export const ResourcesTreeItem = observer(
  ({ data }: ResourcesTreeItemProps) => {
    const { resourceService } = useStore()
    const resource = data.extraData.node
    const deleteResourceModal = useDeleteResourceModal()

    const onEdit = () => {
      resourceService.updateForm.open(resourceRef(resource))
    }

    const onDelete = () => {
      deleteResourceModal.open(resourceRef(resource))
    }

    const toolbarItems: Array<ToolbarItem> = [
      {
        cuiKey: MODEL_ACTION.DeleteResource.key,
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
