import PlusOutlined from '@ant-design/icons/PlusOutlined'
import { MODEL_ACTION, MODEL_UI } from '@codelab/frontend/abstract/types'
import {
  CreateComponentPopover,
  DeleteComponentModal,
} from '@codelab/frontend/application/component'
import { useStore } from '@codelab/frontend/application/shared/store'
import type { CuiSidebarView } from '@codelab/frontend/presentation/codelab-ui'
import { CuiSidebar, useCui } from '@codelab/frontend/presentation/codelab-ui'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { CustomComponents, PreBuiltComponents } from './tab-contents'

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
