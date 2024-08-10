'use client'

import PlusOutlined from '@ant-design/icons/PlusOutlined'
import { PageType, UiKey } from '@codelab/frontend/abstract/types'
import {
  CuiSidebar,
  useCui,
  useToolbarPagination,
} from '@codelab/frontend/presentation/codelab-ui'
import { CreateFieldPopover } from '@codelab/frontend-application-type/use-cases/create-field'
import React from 'react'
import { useAtomService } from '../services/atom.service'
import { CreateAtomPopover } from '../use-cases/create-atom'
import { useCreateAtomModal } from '../use-cases/create-atom/create-atom.state'
import { AtomsTreeView } from '../use-cases/get-atoms/AtomsTreeView'

export const AtomsPrimarySidebar = () => {
  const atomService = useAtomService()
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
      uiKey={UiKey.AtomSidebar}
      views={[
        {
          content: <AtomsTreeView showSearchBar={showSearchBar} />,
          key: 'atoms-view',
          label: 'Atoms',
          toolbar: {
            items: [
              ...toolbarItems,
              {
                cuiKey: UiKey.CreateAtomToolbarItem,
                icon: <PlusOutlined />,
                onClick: () => {
                  createAtomForm.open()
                  popover.open(UiKey.CreateAtomPopover)
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
}
