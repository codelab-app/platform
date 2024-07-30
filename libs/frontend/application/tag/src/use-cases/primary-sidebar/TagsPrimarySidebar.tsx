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
import { tagRef } from '@codelab/frontend-domain-tag/store'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { useTagService } from '../../services'
import { CreateTagPopover } from '../create-tag'
import { useCreateTagForm } from '../create-tag/create-tag.data'
import { useDeleteTagsModal } from '../delete-tags/delete-tags.state'
import { TagsTreeView } from '../get-tags'

export const TagsPrimarySidebar = observer(() => {
  const tagService = useTagService()
  const createTagForm = useCreateTagForm()
  const deleteTagsModal = useDeleteTagsModal()
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
        createTagForm.open()
        popover.open(MODEL_ACTION.CreateTag.key)
      },
      title: 'Create Tag',
    },
    {
      cuiKey: MODEL_ACTION.DeleteTag.key,
      icon: <DeleteOutlined />,
      onClick: () => deleteTagsModal.open(tags.map((tag) => tag.current)),
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
