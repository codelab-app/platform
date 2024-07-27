'use client'

import PlusOutlined from '@ant-design/icons/PlusOutlined'
import { MODEL_ACTION, MODEL_UI } from '@codelab/frontend/abstract/types'
import { useDomainStore } from '@codelab/frontend/infra/mobx'
import type { CuiSidebarView } from '@codelab/frontend/presentation/codelab-ui'
import { CuiSidebar, useCui } from '@codelab/frontend/presentation/codelab-ui'
import {
  CreateComponentPopover,
  useCreateComponentForm,
} from '@codelab/frontend-application-component/use-cases/create-component'
import { DeleteComponentModal } from '@codelab/frontend-application-component/use-cases/delete-component'
import { ImportComponentDialog } from '@codelab/frontend-application-component/use-cases/import-component'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { ComponentList } from './tab-contents/ComponentList'
import { CustomComponents } from './tab-contents/CustomComponents'

export const ComponentsPrimarySidebar = observer(() => {
  const { atomDomainService, componentDomainService } = useDomainStore()
  const { popover } = useCui()
  const createForm = useCreateComponentForm()

  const sidebarViews: Array<CuiSidebarView> = [
    {
      content: (
        <div className="p-3">
          <CustomComponents components={componentDomainService.componentList} />
        </div>
      ),
      key: 'custom',
      label: 'Custom',
      toolbar: {
        items: [
          {
            cuiKey: MODEL_ACTION.CreateComponent.key,
            icon: <PlusOutlined />,
            onClick: () => {
              createForm.open({})
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
          <ComponentList components={atomDomainService.atomsList} />
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
        uiKey={MODEL_UI.SidebarComponent.key}
        views={sidebarViews}
      />

      <DeleteComponentModal />
    </>
  )
})

ComponentsPrimarySidebar.displayName = 'ComponentsPrimarySidebar'
