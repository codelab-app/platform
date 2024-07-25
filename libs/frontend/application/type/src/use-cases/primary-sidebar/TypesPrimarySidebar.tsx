import PlusOutlined from '@ant-design/icons/PlusOutlined'
import {
  MODEL_ACTION,
  MODEL_UI,
  PageType,
} from '@codelab/frontend/abstract/types'
import { useStore } from '@codelab/frontend/infra/mobx'
import {
  CuiSidebar,
  useCui,
  useToolbarPagination,
} from '@codelab/frontend/presentation/codelab-ui'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { CreateFieldPopover } from '../create-field'
import { CreateTypePopover } from '../create-type'
import { TypesTreeView } from '../get-types'

export const TypesPrimarySidebar = observer(() => {
  const { typeService } = useStore()
  const { popover } = useCui()

  const { showSearchBar, toolbarItems } = useToolbarPagination(
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
      uiKey={MODEL_UI.SidebarType.key}
      views={[
        {
          content: <TypesTreeView showSearchBar={showSearchBar} />,
          key: 'types-view',
          label: 'Types',
          toolbar: {
            items: [
              ...toolbarItems,
              {
                cuiKey: MODEL_ACTION.CreateType.key,
                icon: <PlusOutlined />,
                onClick: () => {
                  popover.open(MODEL_ACTION.CreateType.key)
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
