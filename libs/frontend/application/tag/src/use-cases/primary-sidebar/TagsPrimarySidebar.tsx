import DeleteOutlined from '@ant-design/icons/DeleteOutlined'
import PlusOutlined from '@ant-design/icons/PlusOutlined'
import { MODEL_ACTION, MODEL_UI } from '@codelab/frontend/abstract/types'
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
  const tags = tagService.checkedTags.map((tag) => tagRef(tag.current))

  const toolbarItems = [
    {
      icon: <PlusOutlined />,
      key: MODEL_ACTION.CreateTag.key,
      onClick: () => {
        tagService.createForm.open()
        popover.open(MODEL_ACTION.CreateTag.key)
      },
      title: 'Create Tag',
    },
    {
      icon: <DeleteOutlined />,
      key: MODEL_ACTION.DeleteTag.key,
      onClick: () => tagService.deleteManyModal.open(tags),
      title: 'Delete Tag',
    },
  ]

  return (
    <CuiSidebar
      key={MODEL_UI.SidebarTag.key}
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
