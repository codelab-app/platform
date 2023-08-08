import { PlusOutlined } from '@ant-design/icons'
import { FormNames } from '@codelab/frontend/abstract/types'
import {
  CreateComponentPopover,
  DeleteComponentModal,
} from '@codelab/frontend/domain/component'
import type { CuiSidebarView } from '@codelab/frontend/presentation//codelab-ui'
import { CuiSidebar, useCui } from '@codelab/frontend/presentation//codelab-ui'
import { useStore } from '@codelab/frontend/presentation/container'
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
              icon: <PlusOutlined />,
              key: 'AddComponent',
              onClick: () => {
                componentService.createForm.open()
                popover.open(FormNames.CreateComponent)
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
          views={sidebarViews}
        />

        <DeleteComponentModal />
      </>
    )
  },
)

ComponentsPrimarySidebar.displayName = 'ComponentsPrimarySidebar'
