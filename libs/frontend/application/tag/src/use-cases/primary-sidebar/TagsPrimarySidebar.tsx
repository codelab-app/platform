import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import { FormNames } from '@codelab/frontend/abstract/types'
import { useStore } from '@codelab/frontend/application/shared/store'
import { tagRef } from '@codelab/frontend/domain/tag'
import { CuiSidebar, useCui } from '@codelab/frontend/presentation/codelab-ui'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { CreateTagPopover } from '../create-tag'
import { TagsTreeView } from '../get-tags'

export const TagsPrimarySidebar = observer(() => {
  const { tagService } = useStore()
  const { popover } = useCui()
  const ids = tagService.checkedTags.map((tag) => tag.id)

  const toolbarItems = [
    {
      icon: <PlusOutlined />,
      key: 'create',
      onClick: () => {
        tagService.createForm.open()
        popover.open(FormNames.CreateTag)
      },
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
      popover={<CreateTagPopover />}
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