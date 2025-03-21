'use client'

import type { IAtomModel } from '@codelab/frontend/abstract/domain'

import PlusOutlined from '@ant-design/icons/PlusOutlined'
import {
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
  onPageChange(page: number, pageSize: number): void
}>(({ atoms, onPageChange, searchParams }) => {
  const { createPopover, paginationService } = useAtomService()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const { showSearchBar, toolbarItems } = usePaginationToolbar({
    onPageChange: (page: number, pageSize: number) => {
      logTimestampMs('onPageChange')
      // Immediately set loading to true for UI feedback, don't batch with other updates
      setIsLoading(true)

      // Update loading state in service and URL params after local state is updated
      setTimeout(() => {
        onPageChange(page, pageSize)
      })
    },
    pathname: PageType.Atoms(),
    searchParams,
    totalItems: paginationService.totalItems,
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
            isLoading={isLoading}
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
