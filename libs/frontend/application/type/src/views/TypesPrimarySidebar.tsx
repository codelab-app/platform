'use client'

import PlusOutlined from '@ant-design/icons/PlusOutlined'
import { PageType, UiKey } from '@codelab/frontend/abstract/types'
import {
  CuiSidebar,
  useCui,
  useToolbarPagination,
} from '@codelab/frontend/presentation/codelab-ui'
import React from 'react'
import { useTypeService } from '../services'
import { CreateFieldPopover } from '../use-cases/create-field'
import { CreateTypePopover } from '../use-cases/create-type'
import { useCreateTypeForm } from '../use-cases/create-type/create-type.state'
import { TypesTreeView } from '../use-cases/get-types'

export const TypesPrimarySidebar = () => {
  const typeService = useTypeService()
  const createTypeForm = useCreateTypeForm()
  const { popover } = useCui()

  const { showSearchBar, toolbarItems } = useToolbarPagination(
    typeService,
    PageType.Type(),
    { name: 'string' },
  )

  return (
    <CuiSidebar
      defaultActiveViewKeys={['types-view']}
      label="Types"
      popover={
        <>
          <CreateTypePopover />
          <CreateFieldPopover />
        </>
      }
      uiKey={UiKey.TypeSidebar}
      views={[
        {
          content: <TypesTreeView showSearchBar={showSearchBar} />,
          key: 'types-view',
          label: 'Types',
          toolbar: {
            items: [
              ...toolbarItems,
              {
                cuiKey: UiKey.CreateTypeToolbarItem,
                icon: <PlusOutlined />,
                onClick: () => {
                  popover.open(UiKey.CreateTypePopover)
                  createTypeForm.open()
                },
                title: 'Create Type',
              },
            ],
            title: 'types-tree-toolbar',
          },
        },
      ]}
    />
  )
}
