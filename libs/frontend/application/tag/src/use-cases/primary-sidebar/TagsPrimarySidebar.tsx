import DeleteOutlined from '@ant-design/icons/DeleteOutlined'
import PlusOutlined from '@ant-design/icons/PlusOutlined'
import { MODEL_ACTION, MODEL_UI } from '@codelab/frontend/abstract/types'
import { useStore } from '@codelab/frontend/application/shared/store'
import { tagRef } from '@codelab/frontend/domain/tag'
import type { ToolbarItem } from '@codelab/frontend/presentation/codelab-ui'
import { CuiSidebar, useCui } from '@codelab/frontend/presentation/codelab-ui'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { CreateTagPopover } from '../create-tag'
import { TagsTreeView } from '../get-tags'

export const TagsPrimarySidebar = observer(() => {
  const { tagService } = useStore()
  const { popover } = useCui()
  const tags = tagService.checkedTags.map((tag) => tagRef(tag.current))

  const toolbarItems: Array<ToolbarItem> = [
    {
      cuiKey: MODEL_ACTION.CreateTag.key,
      icon: <PlusOutlined />,
      onClick: () => {
        tagService.createForm.open()
        popover.open(MODEL_ACTION.CreateTag.key)
      },
      title: 'Create Tag',
    },
    {
      cuiKey: MODEL_ACTION.DeleteTag.key,
      icon: <DeleteOutlined />,
      onClick: () => tagService.deleteManyModal.open(tags),
      title: 'Delete Tag',
    },
  ]

  return (
    <CuiSidebar
      label="Tags"
      popover={<CreateTagPopover />}
      uiKey={MODEL_UI.SidebarTag.key}
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
