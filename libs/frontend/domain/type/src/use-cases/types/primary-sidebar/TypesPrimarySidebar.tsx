import { PlusOutlined } from '@ant-design/icons'
import { FormNames, PageType } from '@codelab/frontend/abstract/types'
import {
  CuiSidebar,
  useCui,
  useToolbarPagination,
} from '@codelab/frontend/presentation/codelab-ui'
import { useStore } from '@codelab/frontend/presentation/container'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { CreateFieldPopover } from '../../fields'
import { CreateTypePopover } from '../create-type'
import { TypesTreeView } from '../get-types'

export const TypesPrimarySidebar = observer(() => {
  const { typeService } = useStore()
  const { popover } = useCui()

  const { items, showSearchBar } = useToolbarPagination(
    typeService,
    PageType.Type,
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
      views={[
        {
          content: <TypesTreeView showSearchBar={showSearchBar} />,
          key: 'types-view',
          label: 'Types',
          toolbar: {
            items: [
              ...items,
              {
                icon: <PlusOutlined />,
                key: 'create type',
                onClick: () => {
                  popover.open(FormNames.CreateType)
                  typeService.createForm.open()
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
})
