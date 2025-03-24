'use client'

import type { IAtomModel } from '@codelab/frontend/abstract/domain'

import PlusOutlined from '@ant-design/icons/PlusOutlined'
import {
  type IPaginationData,
  type IPaginationSearchParams,
  PageType,
} from '@codelab/frontend/abstract/application'
import { UiKey } from '@codelab/frontend/abstract/types'
import {
  CuiSidebar,
  usePaginationToolbar,
} from '@codelab/frontend/presentation/codelab-ui'
import { logTimestampMs } from '@codelab/shared/infra/logging'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'

import { useAtomService } from '../services/atom.service'
import { AtomsTreeView } from '../use-cases/get-atoms/AtomsTreeView'

export const AtomsPrimarySidebar = observer<{
  atoms: Array<IAtomModel>
  searchParams: IPaginationSearchParams
  pagination: IPaginationData
}>(({ atoms, pagination, searchParams }) => {
  const { createPopover } = useAtomService()
  const router = useRouter()

  // The pagination responsiveness in development mode is quite laggy but in production mode it is prefetched and snappy
  const { showSearchBar, toolbarItems } = usePaginationToolbar({
    pathname: PageType.Atoms(),
    searchParams,
    totalItems: pagination.totalItems,
  })

  /**
   * We don't re-render if the data are the same id's. This prevents re-render from updates, since we use optimistic cache. We only re-render when we fetch different sets of id's
   */
  const views = useMemo(
    () => [
      {
        content: (
          <AtomsTreeView
            data={atoms}
            isLoading={false}
            searchParams={searchParams}
            showSearchBar={showSearchBar}
          />
        ),
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
    [atoms, toolbarItems, router, createPopover],
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
