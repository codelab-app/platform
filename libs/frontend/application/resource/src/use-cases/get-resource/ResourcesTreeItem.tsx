import type {
  IResourceNodeData,
  ITreeNode,
} from '@codelab/frontend/abstract/domain'
import type { ToolbarItem } from '@codelab/frontend/presentation/codelab-ui'
import type { SyntheticEvent } from 'react'

import DeleteOutlined from '@ant-design/icons/DeleteOutlined'
import { RoutePaths } from '@codelab/frontend/abstract/application'
import { UiKey } from '@codelab/frontend/abstract/types'
import {
  CuiTreeItem,
  CuiTreeItemToolbar,
} from '@codelab/frontend/presentation/codelab-ui'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'

import { ResourceIcon } from '../../views'

interface ResourcesTreeItemProps {
  data: ITreeNode<IResourceNodeData>
}

export const ResourcesTreeItem = observer(
  ({ data }: ResourcesTreeItemProps) => {
    const router = useRouter()
    const resource = data.extraData.node
    const onEdit = () => router.push(RoutePaths.ResourcesUpdate(resource.id))

    const onDelete = (event: SyntheticEvent) => {
      event.stopPropagation()
      router.push(RoutePaths.ResourcesDelete(resource.id))
    }

    const toolbarItems: Array<ToolbarItem> = [
      {
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
  },
)
