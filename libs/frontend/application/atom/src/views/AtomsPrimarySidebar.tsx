'use client'

import type { IAtomModel } from '@codelab/frontend/abstract/domain'

import PlusOutlined from '@ant-design/icons/PlusOutlined'
import { PageType } from '@codelab/frontend/abstract/application'
import { Model, UiKey } from '@codelab/frontend/abstract/types'
import {
  CuiSidebar,
  useToolbarPagination,
} from '@codelab/frontend/presentation/codelab-ui'
import { useTablePagination } from '@codelab/frontend-application-shared-store/pagination'
import { useUpdateSearchParams } from '@codelab/frontend-application-shared-store/router'
import { useApplicationStore } from '@codelab/frontend-infra-mobx/context'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'
import { useMemo } from 'react'

import { useAtomService } from '../services/atom.service'
import { AtomsTreeView } from '../use-cases/get-atoms/AtomsTreeView'

export const AtomsPrimarySidebar = observer(() => {
  const { createPopover, paginationService } = useAtomService()
  const router = useRouter()
  const { routerService } = useApplicationStore()
  const data = paginationService.data
  const updateParams = useUpdateSearchParams()

  const { showSearchBar, toolbarItems } = useToolbarPagination({
    onPageChange: (page, pageSize) => {
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
    },
    page: routerService.page,
    pageSize: routerService.pageSize,
    totalItems: paginationService.totalItems,
  })

  const isLoading =
    paginationService.isLoading || paginationService.isLoadingBetweenPages

  const atomsTreeView = (
    <AtomsTreeView
      data={data}
      // This takes care of initial load and loading between pages
      isLoading={isLoading}
      showSearchBar={showSearchBar}
    />
  )

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
    [atomsTreeView],
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
