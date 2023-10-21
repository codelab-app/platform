import { DeleteOutlined } from '@ant-design/icons'
import type { ITagsTreeDataNode } from '@codelab/frontend/abstract/domain'
import { useStore } from '@codelab/frontend/application/shared/store'
import {
  CuiTreeItem,
  CuiTreeItemToolbar,
} from '@codelab/frontend/presentation/codelab-ui'
import { observer } from 'mobx-react-lite'
import React from 'react'

interface TagsTreeItemProps {
  data: ITagsTreeDataNode
}

export const TagsTreeItem = observer(({ data }: TagsTreeItemProps) => {
  const { tagService } = useStore()

  return (
    <CuiTreeItem
      onClick={() => {
        tagService.updateForm.open(data.extraData.node)
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
                tagService.deleteManyModal.open([data.extraData.node])
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
