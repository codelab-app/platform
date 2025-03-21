'use client'

import type { ToolbarItem } from '@codelab/frontend/presentation/codelab-ui'

import DeleteOutlined from '@ant-design/icons/DeleteOutlined'
import PlusOutlined from '@ant-design/icons/PlusOutlined'
import { PageType } from '@codelab/frontend/abstract/application'
import { UiKey } from '@codelab/frontend/abstract/types'
import {
  CuiSidebar,
  usePaginationToolbar,
} from '@codelab/frontend/presentation/codelab-ui'
import { useApplicationStore } from '@codelab/frontend-infra-mobx/context'
import { useRouter } from 'next/navigation'

import { useTagService } from '../services'
import { CreateTagPopover } from '../use-cases/create-tag'
import { TagsTreeView } from '../use-cases/get-tags'

export const TagsPrimarySidebar = () => {
  const router = useRouter()
  const { checkedTagIds, createPopover, paginationService } = useTagService()
  const { routerService } = useApplicationStore()

  const { showSearchBar, toolbarItems } = usePaginationToolbar(
    paginationService,
    routerService,
  )

  const items: Array<ToolbarItem> = [
    {
      cuiKey: UiKey.TagToolbarItemCreate,
      icon: <PlusOutlined />,
      onClick: () => createPopover.open(router),
      title: 'Create Tag',
    },
    {
      cuiKey: UiKey.TagToolbarItemDelete,
      icon: <DeleteOutlined />,
      onClick: () => router.push(PageType.TagsDelete(checkedTagIds)),
      title: 'Delete Tag',
    },
  ]

  return (
    <CuiSidebar
      label="Tags"
      popover={<CreateTagPopover />}
      uiKey={UiKey.TagSidebar}
      views={[
        {
          content: <TagsTreeView showSearchBar={showSearchBar} />,
          key: 'tags',
          label: 'Tags',
          toolbar: {
            items: [...toolbarItems, ...items],
            title: 'Tags toolbar',
          },
        },
      ]}
    />
  )
}

TagsPrimarySidebar.displayName = 'TagsPrimarySidebar'
