'use client'

import type { IAtomModel } from '@codelab/frontend/abstract/domain'
import type { SearchParamsClientProps } from '@codelab/frontend/abstract/types'

import PlusOutlined from '@ant-design/icons/PlusOutlined'
import {
  type IAtomCreateRoute,
  type IPaginationData,
  RoutePaths,
} from '@codelab/frontend/abstract/application'
import { UiKey } from '@codelab/frontend/abstract/types'
import {
  CuiSidebar,
  usePaginationToolbar,
} from '@codelab/frontend/presentation/codelab-ui'
import { useRouter } from 'next/navigation'
import { useMemo } from 'react'

import { useAtomService } from '../services/atom.service'
import { AtomsTreeView } from '../use-cases/atom-list/AtomsTreeView'

interface AtomsPrimarySidebarProps {
  atoms: Array<IAtomModel>
  context: IAtomCreateRoute
  pagination: IPaginationData
  searchParams: SearchParamsClientProps
}

export const AtomsPrimarySidebar = ({
  atoms,
  context,
  pagination,
  searchParams,
}: AtomsPrimarySidebarProps) => {
  const { createPopover } = useAtomService()
  const router = useRouter()

  // The pagination responsiveness in development mode is quite laggy but in production mode it is prefetched and snappy
  const { showSearchBar, toolbarItems } = usePaginationToolbar({
    pathname: RoutePaths.Atom.base(),
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
            context={context}
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
                createPopover.open(router, context)
              },
              title: 'Create Atom',
            },
          ],
          title: 'atoms-tree-toolbar',
        },
      },
    ],
    [atoms, toolbarItems, router, createPopover, showSearchBar],
  )

  return (
    <CuiSidebar
      defaultActiveViewKeys={['atoms-view']}
      label="Atoms"
      uiKey={UiKey.AtomSidebar}
      views={views}
    />
  )
}

AtomsPrimarySidebar.displayName = 'AtomsPrimarySidebar'
