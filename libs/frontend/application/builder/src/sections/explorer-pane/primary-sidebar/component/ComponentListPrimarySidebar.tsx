'use client'

import type { CuiSidebarView } from '@codelab/frontend/presentation/codelab-ui'

import PlusOutlined from '@ant-design/icons/PlusOutlined'
import { NewRoutePaths } from '@codelab/frontend/abstract/application'
import { UiKey } from '@codelab/frontend/abstract/types'
import { CuiSidebar } from '@codelab/frontend/presentation/codelab-ui'
import { ImportComponentDialog } from '@codelab/frontend-application-component/use-cases/import-component'
import { useRouter } from 'next/navigation'

import { CustomComponents } from '../../tab-contents/CustomComponents'
import { PreBuiltComponents } from '../../tab-contents/PreBuiltComponents'

export const ComponentListPrimarySidebar = () => {
  const router = useRouter()

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
            cuiKey: UiKey.ComponentToolbarItemCreate,
            icon: <PlusOutlined />,
            onClick: () => {
              router.push(NewRoutePaths.Component.create())
            },
            title: 'Add Component',
          },
          {
            cuiKey: UiKey.ComponentToolbarItemImport,
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
    <CuiSidebar
      defaultActiveViewKeys={['custom', 'pre-built']}
      label="Components"
      uiKey={UiKey.ComponentSidebar}
      views={sidebarViews}
    />
  )
}

ComponentListPrimarySidebar.displayName = 'ComponentsPrimarySidebar'
