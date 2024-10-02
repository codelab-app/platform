'use client'

import type { ITagNodeData, ITreeNode } from '@codelab/frontend/abstract/domain'

import DeleteOutlined from '@ant-design/icons/DeleteOutlined'
import { UiKey } from '@codelab/frontend/abstract/types'
import {
  CuiTreeItem,
  CuiTreeItemToolbar,
} from '@codelab/frontend/presentation/codelab-ui'
import { observer } from 'mobx-react-lite'

import { useDeleteTagsModal } from '../delete-tags/delete-tags.state'
import { useUpdateTagForm } from '../update-tag'

interface TagsTreeItemProps {
  data: ITreeNode<ITagNodeData>
}

export const TagsTreeItem = observer(({ data }: TagsTreeItemProps) => {
  const updateTagForm = useUpdateTagForm()
  const deleteTagsModal = useDeleteTagsModal()

  return (
    <CuiTreeItem
      onClick={() => {
        updateTagForm.open(data.extraData.node)
      }}
      primaryTitle={data.primaryTitle}
      toolbar={
        <CuiTreeItemToolbar
          items={[
            {
              cuiKey: UiKey.TagToolbarItemDelete,
              icon: <DeleteOutlined />,
              label: 'Delete',
              onClick: () => {
                deleteTagsModal.open([data.extraData.node])
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
