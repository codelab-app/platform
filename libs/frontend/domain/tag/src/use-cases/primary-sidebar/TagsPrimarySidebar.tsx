import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import { CuiSidebar } from '@codelab/frontend/presentation//codelab-ui'
import { useStore } from '@codelab/frontend/presentation/container'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { tagRef } from '../../store'
import { TagsTreeView } from '../get-tags'

export const TagsPrimarySidebar = observer(() => {
  const { tagService } = useStore()
  const ids = tagService.checkedTags.map((tag) => tag.id)

  const toolbarItems = [
    {
      icon: <PlusOutlined />,
      key: 'create',
      onClick: () => tagService.createModal.open(),
      title: 'Create Tag',
    },
    {
      icon: <DeleteOutlined />,
      key: 'delete',
      onClick: () =>
        tagService.deleteManyModal.open(ids.map((id) => tagRef(id))),
      title: 'Delete Tag',
    },
  ]

  return (
    <CuiSidebar
      label="Tags"
      views={[
        {
          content: <TagsTreeView />,
          key: 'tags',
          label: 'Tags',
          toolbar: {
            items: toolbarItems,
            title: 'Tags toolbar',
          },
        },
      ]}
    />
  )
})
