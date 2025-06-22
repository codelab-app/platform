'use client'

import type {
  IPaginationData,
  ITypeCreateRoute,
} from '@codelab/frontend-abstract-application'
import type { ITypeModel } from '@codelab/frontend-abstract-domain'

import PlusOutlined from '@ant-design/icons/PlusOutlined'
import { RoutePaths } from '@codelab/frontend-abstract-application'
import { UiKey } from '@codelab/frontend-abstract-types'
import {
  CuiSidebar,
  usePaginationToolbar,
} from '@codelab/frontend-presentation-codelab-ui'
import { useDomainStore } from '@codelab/frontend-infra-mobx-context'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo } from 'react'

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
  const { typeDomainService } = useDomainStore()
  const router = useRouter()

  const { handlePaginationChange, showSearchBar, toolbarItems } =
    usePaginationToolbar({
      pathname: RoutePaths.Type.base(),
      searchParams: context.searchParams,
      totalItems: pagination.totalItems,
    })

  useEffect(() => {
    typeDomainService.setSelectedKey(context.searchParams.selectedKey)
    typeDomainService.setExpandedNodes(context.searchParams.expandedKeys ?? [])
  }, [context])

  const views = useMemo(() => {
    return [
      {
        content: (
          <TypesTreeView
            data={types}
            handlePaginationChange={handlePaginationChange}
            isLoading={false}
            searchParams={context.searchParams}
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
  }, [types, toolbarItems, router, createPopover, showSearchBar])

  return (
    <CuiSidebar
      defaultActiveViewKeys={['types-view']}
      label="Types"
      uiKey={UiKey.TypeSidebar}
      views={views}
    />
  )
}
