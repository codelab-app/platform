'use client'

import PlusOutlined from '@ant-design/icons/PlusOutlined'
import type { IAtomModel } from '@codelab/frontend/abstract/domain'
import { PageType, UiKey } from '@codelab/frontend/abstract/types'
import {
  CuiSidebar,
  useCui,
  useToolbarPagination,
} from '@codelab/frontend/presentation/codelab-ui'
import {
  usePaginationQuery,
  useTablePagination,
} from '@codelab/frontend-application-shared-store/pagination'
import { CreateFieldPopover } from '@codelab/frontend-application-type/use-cases/create-field'
import { useApplicationStore } from '@codelab/frontend-infra-mobx/context'
import { observer } from 'mobx-react-lite'
import { usePathname, useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'
import { useAtomService } from '../services/atom.service'
import { CreateAtomPopover } from '../use-cases/create-atom'
import { useCreateAtomModal } from '../use-cases/create-atom/create-atom.state'
import { AtomsTreeView } from '../use-cases/get-atoms/AtomsTreeView'

export const AtomsPrimarySidebar = observer(() => {
  const { routerService } = useApplicationStore()
  const { paginationService } = useAtomService()
  const { popover } = useCui()
  const createAtomForm = useCreateAtomModal()

  // const tablePagination = useTablePagination<IAtomModel, { name: string }>({
  //   paginationService: atomPagination,
  //   pathname: PageType.Atoms(),
  // })

  const { showSearchBar, toolbarItems } =
    useToolbarPagination(paginationService)

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
})
