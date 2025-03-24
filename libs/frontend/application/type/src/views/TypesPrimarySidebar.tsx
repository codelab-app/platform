'use client'

import type { IPaginationSearchParams } from '@codelab/frontend/abstract/application'
import type { ITypeModel } from '@codelab/frontend/abstract/domain'

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

import { useTypeService } from '../services'
import { TypesTreeView } from '../use-cases/get-types'

export const TypesPrimarySidebar = observer<{
  types: Array<ITypeModel>
  searchParams: IPaginationSearchParams
}>(({ searchParams, types }) => {
  const { createPopover, paginationService } = useTypeService()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const { showSearchBar, toolbarItems } = usePaginationToolbar({
    onPageChange: (page: number, pageSize: number) => {
      setIsLoading(true)
    },
    pathname: PageType.Type(),
    searchParams,
    totalItems: paginationService.totalItems,
  })

  const views = useMemo(() => {
    return [
      {
        content: (
          <TypesTreeView
            data={types}
            isLoading={isLoading}
            showSearchBar={showSearchBar}
          />
        ),
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
})
