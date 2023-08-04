import { DeleteOutlined } from '@ant-design/icons'
import type { ITagsTreeDataNode } from '@codelab/frontend/abstract/core'
import {
  CuiTreeItem,
  CuiTreeItemToolbar,
} from '@codelab/frontend/presentation//codelab-ui'
import { useStore } from '@codelab/frontend/presentation/container'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { tagRef } from '../../store'

interface TagsTreeItemProps {
  data: ITagsTreeDataNode
}

export const TagsTreeItem = observer(({ data }: TagsTreeItemProps) => {
  const { tagService } = useStore()

  return (
    <CuiTreeItem
      onClick={() => {
        tagService.updateForm.open(tagRef(data.extraData.node.id))
      }}
      primaryTitle={data.primaryTitle}
      toolbar={
        <CuiTreeItemToolbar
          items={[
            {
              icon: <DeleteOutlined />,
              key: 'delete',
              label: 'Delete',
              onClick: () => {
                tagService.deleteManyModal.open([
                  tagRef(data.extraData.node.id),
                ])
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
