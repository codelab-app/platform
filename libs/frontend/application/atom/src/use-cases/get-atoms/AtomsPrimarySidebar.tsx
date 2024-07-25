'use client'

import PlusOutlined from '@ant-design/icons/PlusOutlined'
import {
  MODEL_ACTION,
  MODEL_UI,
  PageType,
} from '@codelab/frontend/abstract/types'
import {
  CuiSidebar,
  useCui,
  useToolbarPagination,
} from '@codelab/frontend/presentation/codelab-ui'
import { useStore } from '@codelab/frontend-application-shared-store/provider'
import { CreateFieldPopover } from '@codelab/frontend-application-type/use-cases/create-field'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { CreateAtomPopover } from '../create-atom'
import { useCreateAtomModal } from '../create-atom/create-atom.state'
import { AtomsTreeView } from './AtomsTreeView'

export const AtomsPrimarySidebar = observer(() => {
  const { atomService } = useStore()
  const { popover } = useCui()
  const createAtomForm = useCreateAtomModal()

  const { showSearchBar, toolbarItems } = useToolbarPagination(
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
      uiKey={MODEL_UI.SidebarAtom.key}
      views={[
        {
          content: <AtomsTreeView showSearchBar={showSearchBar} />,
          key: 'atoms-view',
          label: 'Atoms',
          toolbar: {
            items: [
              ...toolbarItems,
              {
                cuiKey: MODEL_ACTION.CreateAtom.key,
                icon: <PlusOutlined />,
                onClick: () => {
                  createAtomForm.open()
                  popover.open(MODEL_ACTION.CreateAtom.key)
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
