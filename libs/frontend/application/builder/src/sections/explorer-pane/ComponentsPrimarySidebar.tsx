import PlusOutlined from '@ant-design/icons/PlusOutlined'
import { MODEL_ACTION, MODEL_UI } from '@codelab/frontend/abstract/types'
import type { CuiSidebarView } from '@codelab/frontend/presentation/codelab-ui'
import { CuiSidebar, useCui } from '@codelab/frontend/presentation/codelab-ui'
import { CreateComponentPopover } from '@codelab/frontend-application-component/use-cases/create-component'
import { DeleteComponentModal } from '@codelab/frontend-application-component/use-cases/delete-component'
import { ImportComponentDialog } from '@codelab/frontend-application-component/use-cases/import-component'
import { useStore } from '@codelab/frontend-application-shared-store/provider'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { CustomComponents } from './tab-contents/CustomComponents'
import { PreBuiltComponents } from './tab-contents/PreBuiltComponents'

interface ComponentsPrimarySidebarProps {
  isLoading: boolean
}

export const ComponentsPrimarySidebar = observer<ComponentsPrimarySidebarProps>(
  ({ isLoading }) => {
    const { componentService } = useStore()
    const { popover } = useCui()

    const sidebarViews: Array<CuiSidebarView> = [
      {
        content: (
          <div className="p-3">
            <CustomComponents />
          </div>
        ),
        isLoading,
        key: 'custom',
        label: 'Custom',
        toolbar: {
          items: [
            {
              cuiKey: MODEL_ACTION.CreateComponent.key,
              icon: <PlusOutlined />,
              onClick: () => {
                componentService.createForm.open()

                popover.open(MODEL_ACTION.CreateComponent.key)
              },
              title: 'Add Component',
            },
            {
              cuiKey: MODEL_ACTION.ImportComponent.key,
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
        isLoading,
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
          uiKey={MODEL_UI.SidebarComponent.key}
          views={sidebarViews}
        />

        <DeleteComponentModal />
      </>
    )
  },
)

ComponentsPrimarySidebar.displayName = 'ComponentsPrimarySidebar'
