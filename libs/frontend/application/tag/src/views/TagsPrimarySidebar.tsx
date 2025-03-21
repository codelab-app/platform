'use client'

import type { IPaginationSearchParams } from '@codelab/frontend/abstract/application'
import type { ITagModel } from '@codelab/frontend/abstract/domain'

import DeleteOutlined from '@ant-design/icons/DeleteOutlined'
import PlusOutlined from '@ant-design/icons/PlusOutlined'
import { PageType } from '@codelab/frontend/abstract/application'
import { UiKey } from '@codelab/frontend/abstract/types'
import {
  CuiSidebar,
  usePaginationToolbar,
} from '@codelab/frontend/presentation/codelab-ui'
import { logTimestampMs } from '@codelab/shared/infra/logging'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'

import { useTagService } from '../services'
import { CreateTagPopover } from '../use-cases/create-tag'
import { TagsTreeView } from '../use-cases/get-tags'

export const TagsPrimarySidebar = observer<{
  tags: Array<ITagModel>
  searchParams: IPaginationSearchParams
  onPageChange(page: number, pageSize: number): void
}>(({ onPageChange, searchParams, tags }) => {
  const router = useRouter()
  const { checkedTagIds, createPopover, paginationService } = useTagService()
  const [isLoading, setIsLoading] = useState(false)

  const { showSearchBar, toolbarItems } = usePaginationToolbar({
    onPageChange: (page: number, pageSize: number) => {
      logTimestampMs('onPageChange')
      setIsLoading(true)

      setTimeout(() => {
        onPageChange(page, pageSize)
      })
    },
    pathname: PageType.Tags(),
    searchParams,
    totalItems: paginationService.totalItems,
  })

  const views = useMemo(
    () => [
      {
        content: (
          <TagsTreeView
            data={tags}
            isLoading={isLoading}
            showSearchBar={showSearchBar}
          />
        ),
        key: 'tags',
        label: 'Tags',
        toolbar: {
          items: [
            ...toolbarItems,
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
          ],
          title: 'Tags toolbar',
        },
      },
    ],
    [tags, toolbarItems, isLoading, showSearchBar],
  )

  return (
    <CuiSidebar
      defaultActiveViewKeys={['tags']}
      label="Tags"
      popover={<CreateTagPopover />}
      uiKey={UiKey.TagSidebar}
      views={views}
    />
  )
})

TagsPrimarySidebar.displayName = 'TagsPrimarySidebar'
