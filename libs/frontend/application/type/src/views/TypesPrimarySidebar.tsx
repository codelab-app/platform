'use client'

import type {
  IPaginationData,
  IPaginationSearchParams,
} from '@codelab/frontend/abstract/application'
import type { ITypeModel } from '@codelab/frontend/abstract/domain'

import PlusOutlined from '@ant-design/icons/PlusOutlined'
import { RoutePaths } from '@codelab/frontend/abstract/application'
import { UiKey } from '@codelab/frontend/abstract/types'
import {
  CuiSidebar,
  usePaginationToolbar,
} from '@codelab/frontend/presentation/codelab-ui'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'

import { useTypeService } from '../services'
import { TypesTreeView } from '../use-cases/get-types'

interface TypesPrimarySidebarProps {
  pagination: IPaginationData
  searchParams: IPaginationSearchParams
  types: Array<ITypeModel>
}

export const TypesPrimarySidebar = ({
  pagination,
  searchParams,
  types,
}: TypesPrimarySidebarProps) => {
  const { createPopover } = useTypeService()
  const router = useRouter()

  const { showSearchBar, toolbarItems } = usePaginationToolbar({
    pathname: RoutePaths.Type(),
    searchParams,
    totalItems: pagination.totalItems,
  })

  const views = useMemo(() => {
    return [
      {
        content: (
          <TypesTreeView
            data={types}
            isLoading={false}
            searchParams={searchParams}
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
}
