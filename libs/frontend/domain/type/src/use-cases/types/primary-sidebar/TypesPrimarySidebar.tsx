import { PlusOutlined } from '@ant-design/icons'
import { PageType } from '@codelab/frontend/abstract/types'
import {
  CuiSidebar,
  useToolbarPagination,
} from '@codelab/frontend/presentation//codelab-ui'
import { useStore } from '@codelab/frontend/presentation/container'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { TypesTreeView } from '../get-types'

export const TypesPrimarySidebar = observer(() => {
  const { typeService } = useStore()

  const { items, showSearchBar } = useToolbarPagination(
    typeService,
    PageType.Type,
    { name: 'string' },
  )

  return (
    <CuiSidebar
      defaultActiveViewKeys={['types-view']}
      label="Types"
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
                onClick: () => typeService.createModal.open(),
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
