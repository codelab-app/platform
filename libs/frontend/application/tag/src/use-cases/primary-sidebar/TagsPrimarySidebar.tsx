import DeleteOutlined from '@ant-design/icons/DeleteOutlined'
import PlusOutlined from '@ant-design/icons/PlusOutlined'
import {
  MODEL_ACTION,
  MODEL_UI,
  PageType,
} from '@codelab/frontend/abstract/types'
import type { ToolbarItem } from '@codelab/frontend/presentation/codelab-ui'
import {
  CuiSidebar,
  useCui,
  useToolbarPagination,
} from '@codelab/frontend/presentation/codelab-ui'
import { useStore } from '@codelab/frontend-application-shared-store/provider'
import { tagRef } from '@codelab/frontend-domain-tag/store'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { CreateTagPopover } from '../create-tag'
import { TagsTreeView } from '../get-tags'

export const TagsPrimarySidebar = observer(() => {
  const { tagService } = useStore()
  const { popover } = useCui()

  const { showSearchBar, toolbarItems } = useToolbarPagination(
    tagService,
    PageType.Tags,
    { name: 'string' },
  )

  const tags = tagService.checkedTags.map((tag) => tagRef(tag.current))

  const items: Array<ToolbarItem> = [
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
          content: <TagsTreeView showSearchBar={showSearchBar} />,
          key: 'tags',
          label: 'Tags',
          toolbar: {
            items: [...items, ...toolbarItems],
            title: 'Tags toolbar',
          },
        },
      ]}
    />
  )
})

TagsPrimarySidebar.displayName = 'TagsPrimarySidebar'
