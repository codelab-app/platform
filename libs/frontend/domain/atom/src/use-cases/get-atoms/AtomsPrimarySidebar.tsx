import { PlusOutlined } from '@ant-design/icons'
import { FormNames, PageType } from '@codelab/frontend/abstract/types'
import { CreateFieldPopover } from '@codelab/frontend/domain/type'
import {
  CuiSidebar,
  useCui,
  useToolbarPagination,
} from '@codelab/frontend/presentation//codelab-ui'
import { useStore } from '@codelab/frontend/presentation/container'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { CreateAtomPopover } from '../create-atom'
import { AtomsTreeView } from './AtomsTreeView'

export const AtomsPrimarySidebar = observer(() => {
  const { atomService } = useStore()
  const { popover } = useCui()

  const { items, showSearchBar } = useToolbarPagination(
    atomService,
    PageType.Atoms,
    { name: 'string' },
  )

  return (
    <CuiSidebar
      defaultActiveViewKeys={['atoms-view']}
      label="Atoms"
      popover={
        <>
          <CreateAtomPopover />
          <CreateFieldPopover />
        </>
      }
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
                onClick: () => {
                  atomService.createForm.open()
                  popover.open(FormNames.CreateAtom)
                },
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
