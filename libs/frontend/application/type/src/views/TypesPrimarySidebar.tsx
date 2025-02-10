'use client'

import PlusOutlined from '@ant-design/icons/PlusOutlined'
import { UiKey } from '@codelab/frontend/abstract/types'
import {
  CuiSidebar,
  useToolbarPagination,
} from '@codelab/frontend/presentation/codelab-ui'
import { useApplicationStore } from '@codelab/frontend-infra-mobx/context'
import { useRouter } from 'next/navigation'
import { useMemo } from 'react'

import { useTypeService } from '../services'
import { TypesTreeView } from '../use-cases/get-types'

export const TypesPrimarySidebar = () => {
  const { createPopover, paginationService } = useTypeService()
  const { routerService } = useApplicationStore()
  const router = useRouter()

  const { showSearchBar, toolbarItems } = useToolbarPagination(
    paginationService,
    routerService,
  )

  const views = useMemo(() => {
    return [
      {
        content: <TypesTreeView showSearchBar={showSearchBar} />,
        key: 'types-view',
        label: 'Types',
        toolbar: {
          items: [
            ...toolbarItems,
            {
              cuiKey: UiKey.TypeToolbarItemCreate,
              icon: <PlusOutlined />,
              onClick: () => createPopover.open(router),
              title: 'Create Type',
            },
          ],
          title: 'types-tree-toolbar',
        },
      },
    ]
  }, [showSearchBar])

  return (
    <CuiSidebar
      defaultActiveViewKeys={['types-view']}
      label="Types"
      uiKey={UiKey.TypeSidebar}
      views={views}
    />
  )
}
