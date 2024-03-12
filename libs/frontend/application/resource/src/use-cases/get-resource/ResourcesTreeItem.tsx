import DeleteOutlined from '@ant-design/icons/DeleteOutlined'
import {
  type IResourcesTreeDataNode,
  resourceRef,
} from '@codelab/frontend/abstract/domain'
import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import { useStore } from '@codelab/frontend/application/shared/store'
import {
  CuiTreeItem,
  CuiTreeItemToolbar,
} from '@codelab/frontend/presentation/codelab-ui'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { ResourceIcon } from '../../view'

interface ResourcesTreeItemProps {
  data: IResourcesTreeDataNode
}

export const ResourcesTreeItem = observer(
  ({ data }: ResourcesTreeItemProps) => {
    const { resourceService } = useStore()
    const resource = data.extraData.node

    const onEdit = () => {
      resourceService.updateForm.open(resourceRef(resource))
    }

    const onDelete = () => {
      resourceService.deleteModal.open(resourceRef(resource))
    }

    const toolbarItems = [
      {
        icon: <DeleteOutlined />,
        key: MODEL_ACTION.DeleteResource.key,
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
