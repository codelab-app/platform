import { PlusOutlined } from '@ant-design/icons'
import { PageType } from '@codelab/frontend/abstract/types'
import {
  CuiSidebar,
  useToolbarPagination,
} from '@codelab/frontend/presentation//codelab-ui'
import { useStore } from '@codelab/frontend/presentation/container'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AtomsTreeView } from './AtomsTreeView'

export const AtomsPrimarySidebar = observer(() => {
  const { atomService } = useStore()

  const { items, showSearchBar } = useToolbarPagination(
    atomService,
    PageType.Atoms,
    { name: 'string' },
  )

  return (
    <CuiSidebar
      defaultActiveViewKeys={['atoms-view']}
      label="Atoms"
      views={[
        {
          content: <AtomsTreeView showSearchBar={showSearchBar} />,
          key: 'atoms-view',
          label: 'Atoms',
          toolbar: {
            items: [
              ...items,
              {
                icon: <PlusOutlined />,
                key: 'create',
                onClick: () => atomService.createModal.open(),
                title: 'Create Atom',
              },
            ],
            title: 'atoms-tree-toolbar',
          },
        },
      ]}
    />
  )
})
