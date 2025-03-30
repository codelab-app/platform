'use client'

import type {
  IPaginationData,
  ITypeCreateRoute,
} from '@codelab/frontend/abstract/application'
import type { ITypeModel } from '@codelab/frontend/abstract/domain'

import PlusOutlined from '@ant-design/icons/PlusOutlined'
import { RoutePaths } from '@codelab/frontend/abstract/application'
import { UiKey } from '@codelab/frontend/abstract/types'
import {
  CuiSidebar,
  usePaginationToolbar,
} from '@codelab/frontend/presentation/codelab-ui'
import { useRouter } from 'next/navigation'
import { useMemo } from 'react'
import { mergeDeep } from 'remeda'

import { useTypeService } from '../services'
import { TypesTreeView } from '../use-cases/get-types'

interface TypesPrimarySidebarProps {
  context: ITypeCreateRoute
  pagination: IPaginationData
  types: Array<ITypeModel>
}

export const TypesPrimarySidebar = ({
  context,
  pagination,
  types,
}: TypesPrimarySidebarProps) => {
  const { createPopover } = useTypeService()
  const router = useRouter()
  const { searchParams } = context

  const { showSearchBar, toolbarItems } = usePaginationToolbar({
    pathname: RoutePaths.Type.base(),
    searchParams,
    totalItems: pagination.totalItems,
  })

  const views = useMemo(() => {
    return [
      {
        content: (
          <TypesTreeView
            context={context}
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
              onClick: () => createPopover.open(router, context),
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
