'use client'

import type { IAtomModel } from '@codelab/frontend/abstract/domain'

import PlusOutlined from '@ant-design/icons/PlusOutlined'
import { PageType } from '@codelab/frontend/abstract/application'
import { Model, UiKey } from '@codelab/frontend/abstract/types'
import {
  CuiSidebar,
  usePaginationToolbar,
} from '@codelab/frontend/presentation/codelab-ui'
import { useTablePagination } from '@codelab/frontend-application-shared-store/pagination'
import { useUpdateSearchParams } from '@codelab/frontend-application-shared-store/router'
import { useApplicationStore } from '@codelab/frontend-infra-mobx/context'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { useAtomService } from '../services/atom.service'
import { AtomsTreeView } from '../use-cases/get-atoms/AtomsTreeView'

export const AtomsPrimarySidebar = observer(() => {
  const { createPopover, paginationService } = useAtomService()
  const router = useRouter()
  const { routerService } = useApplicationStore()
  const data = paginationService.data
  const updateParams = useUpdateSearchParams()
  // Start with false, but track if we're waiting for pagination data
  const [isLocalLoading, setIsLocalLoading] = useState(false)

  // Track initial loading separately
  const isInitialLoading =
    paginationService.isLoading || paginationService.isLoadingBetweenPages

  // Pre-compute loading state to avoid flashing
  const isLoading = isLocalLoading || isInitialLoading

  // Create a toolbar with instant loading feedback
  const { showSearchBar, toolbarItems } = usePaginationToolbar({
    onPageChange: (page: number, pageSize: number) => {
      // Immediately set loading to true for UI feedback, don't batch with other updates
      setIsLocalLoading(true)

      // Update loading state in service and URL params after local state is updated
      setTimeout(() => {
        paginationService.setIsLoadingBetweenPages(true)

        updateParams((params) => {
          params.set('page', page.toString())
          params.set('pageSize', pageSize.toString())
        })

        routerService.setSearchParams({
          ...routerService.searchParams,
          page,
          pageSize,
        })
      }, 0)
    },
    page: routerService.page,
    pageSize: routerService.pageSize,
    totalItems: paginationService.totalItems,
  })

  // Reset local loading when data loading completes
  useEffect(() => {
    if (!isInitialLoading && isLocalLoading) {
      setIsLocalLoading(false)
    }
  }, [isInitialLoading, isLocalLoading])

  // Memoize tree view to prevent unnecessary re-renders
  const atomsTreeView = useMemo(
    () => (
      <AtomsTreeView
        data={data}
        isLoading={isLoading}
        showSearchBar={showSearchBar}
      />
    ),
    [data, isLoading, showSearchBar],
  )

  console.log({ isLoading })

  /**
   * We don't re-render if the data are the same id's. This prevents re-render from updates, since we use optimistic cache. We only re-render when we fetch different sets of id's
   */
  const views = useMemo(
    () => [
      {
        content: atomsTreeView,
        key: 'atoms-view',
        label: 'Atoms',
        toolbar: {
          items: [
            ...toolbarItems,
            {
              cuiKey: UiKey.AtomToolbarItemCreate,
              icon: <PlusOutlined />,
              onClick: () => {
                createPopover.open(router)
              },
              title: 'Create Atom',
            },
          ],
          title: 'atoms-tree-toolbar',
        },
      },
    ],
    [atomsTreeView, toolbarItems, router, createPopover],
  )

  return (
    <CuiSidebar
      defaultActiveViewKeys={['atoms-view']}
      label="Atoms"
      uiKey={UiKey.AtomSidebar}
      views={views}
    />
  )
})

AtomsPrimarySidebar.displayName = 'AtomsPrimarySidebar'
