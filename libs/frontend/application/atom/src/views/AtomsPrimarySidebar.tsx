'use client'

import type { IAtomModel } from '@codelab/frontend/abstract/domain'

import PlusOutlined from '@ant-design/icons/PlusOutlined'
import { PageType } from '@codelab/frontend/abstract/application'
import { UiKey } from '@codelab/frontend/abstract/types'
import {
  CuiSidebar,
  useToolbarPagination,
} from '@codelab/frontend/presentation/codelab-ui'
import { useTablePagination } from '@codelab/frontend-application-shared-store/pagination'
import { useApplicationStore } from '@codelab/frontend-infra-mobx/context'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'
import { useMemo } from 'react'

import { useAtomService } from '../services/atom.service'
import { AtomsTreeView } from '../use-cases/get-atoms/AtomsTreeView'

export const AtomsPrimarySidebar = observer(() => {
  const { createPopover, getDataFn, paginationService } = useAtomService()
  const router = useRouter()
  const { routerService } = useApplicationStore()

  const { showSearchBar, toolbarItems } = useToolbarPagination(
    paginationService,
    routerService,
  )

  const { data, isLoading, isLoadingBetweenPages } =
    useTablePagination<IAtomModel>({
      getDataFn,
      paginationService,
      pathname: PageType.Atoms(),
      routerService,
    })

  /**
   * Let this component re-render itself, we disable loading instead of memoizing on the data
   */
  const atomsTreeView = (
    <AtomsTreeView
      data={data}
      // This takes care of initial load and loading between pages
      isLoading={isLoadingBetweenPages && isLoading}
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
