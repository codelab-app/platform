'use client'

import type { ITagNodeData, ITreeNode } from '@codelab/frontend/abstract/domain'

import DeleteOutlined from '@ant-design/icons/DeleteOutlined'
import { RoutePaths } from '@codelab/frontend/abstract/application'
import { UiKey } from '@codelab/frontend/abstract/types'
import {
  CuiTreeItem,
  CuiTreeItemToolbar,
} from '@codelab/frontend/presentation/codelab-ui'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'

interface TagsTreeItemProps {
  data: ITreeNode<ITagNodeData>
}

export const TagsTreeItem = observer(({ data }: TagsTreeItemProps) => {
  const router = useRouter()

  return (
    <CuiTreeItem
      onClick={() => router.push(RoutePaths.Tag.update(data.extraData.node))}
      primaryTitle={data.primaryTitle}
      toolbar={
        <CuiTreeItemToolbar
          items={[
            {
              cuiKey: UiKey.TagToolbarItemDelete,
              icon: <DeleteOutlined />,
              label: 'Delete',
              onClick: (event: Event) => {
                event.stopPropagation()
                router.push(RoutePaths.Tag.delete([data.extraData.node.id]))
              },
              title: 'Delete',
            },
          ]}
          title="Tags item toolbar"
        />
      }
    />
  )
})
