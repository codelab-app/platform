'use client'

import PlusOutlined from '@ant-design/icons/PlusOutlined'
import { UiKey } from '@codelab/frontend/abstract/types'
import {
  CuiSidebar,
  useToolbarPagination,
} from '@codelab/frontend/presentation/codelab-ui'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'

import { useAtomService } from '../services/atom.service'
import { AtomsTreeView } from '../use-cases/get-atoms/AtomsTreeView'

export const AtomsPrimarySidebar = observer(() => {
  const { atomPopoverCreate, paginationService } = useAtomService()
  const router = useRouter()

  const { showSearchBar, toolbarItems } =
    useToolbarPagination(paginationService)

  return (
    <CuiSidebar
      defaultActiveViewKeys={['atoms-view']}
      label="Atoms"
      // popover={<CreateFieldPopover />}
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
                cuiKey: UiKey.AtomToolbarItemCreate,
                icon: <PlusOutlined />,
                onClick: () => {
                  atomPopoverCreate.open(router)
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
