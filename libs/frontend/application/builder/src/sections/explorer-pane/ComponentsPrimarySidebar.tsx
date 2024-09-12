'use client'

import PlusOutlined from '@ant-design/icons/PlusOutlined'
import { UiKey } from '@codelab/frontend/abstract/types'
import type { CuiSidebarView } from '@codelab/frontend/presentation/codelab-ui'
import { CuiSidebar, useCui } from '@codelab/frontend/presentation/codelab-ui'
import {
  CreateComponentPopover,
  useCreateComponentForm,
} from '@codelab/frontend-application-component/use-cases/create-component'
import { DeleteComponentModal } from '@codelab/frontend-application-component/use-cases/delete-component'
import { ImportComponentDialog } from '@codelab/frontend-application-component/use-cases/import-component'
import { CustomComponents } from './tab-contents/CustomComponents'
import { PreBuiltComponents } from './tab-contents/PreBuiltComponents'

export const ComponentsPrimarySidebar = () => {
  const { popover } = useCui()
  const createComponentForm = useCreateComponentForm()

  const sidebarViews: Array<CuiSidebarView> = [
    {
      content: (
        <div className="p-3">
          <CustomComponents />
        </div>
      ),
      key: 'custom',
      label: 'Custom',
      toolbar: {
        items: [
          {
            cuiKey: UiKey.CreateComponentToolbarItem,
            icon: <PlusOutlined />,
            onClick: () => {
              createComponentForm.open()
              popover.open(UiKey.CreateComponentPopover)
            },
            title: 'Add Component',
          },
          {
            cuiKey: UiKey.ImportComponentToolbarItem,
            icon: <ImportComponentDialog key={0} />,
            title: 'Import Component',
          },
        ],
        title: 'Components Toolbar',
      },
    },
    {
      content: (
        <div className="p-3">
          <PreBuiltComponents />
        </div>
      ),
      key: 'pre-built',
      label: 'Pre-built',
    },
  ]

  return (
    <>
      <CuiSidebar
        defaultActiveViewKeys={['custom', 'pre-built']}
        label="Components"
        popover={<CreateComponentPopover />}
        uiKey={UiKey.ComponentSidebar}
        views={sidebarViews}
      />

      <DeleteComponentModal />
    </>
  )
}

ComponentsPrimarySidebar.displayName = 'ComponentsPrimarySidebar'
