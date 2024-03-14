import PlusOutlined from '@ant-design/icons/PlusOutlined'
import {
  MODEL_ACTION,
  MODEL_UI,
  PageType,
} from '@codelab/frontend/abstract/types'
import { useStore } from '@codelab/frontend/application/shared/store'
import { CreateFieldPopover } from '@codelab/frontend/application/type'
import {
  CuiSidebar,
  useCui,
  useToolbarPagination,
} from '@codelab/frontend/presentation/codelab-ui'
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
      uiKey={MODEL_UI.SidebarAtom.key}
      views={[
        {
          content: <AtomsTreeView showSearchBar={showSearchBar} />,
          key: 'atoms-view',
          label: 'Atoms',
          toolbar: {
            items: [
              ...items,
              {
                cuiKey: MODEL_ACTION.CreateAction.key,
                icon: <PlusOutlined />,
                onClick: () => {
                  atomService.createForm.open()
                  popover.open(MODEL_ACTION.CreateAction.key)
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
