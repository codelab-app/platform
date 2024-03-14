import PlusOutlined from '@ant-design/icons/PlusOutlined'
import { MODEL_ACTION, MODEL_UI } from '@codelab/frontend/abstract/types'
import { useStore } from '@codelab/frontend/application/shared/store'
import type { ToolbarItem } from '@codelab/frontend/presentation/codelab-ui'
import { CuiSidebar, useCui } from '@codelab/frontend/presentation/codelab-ui'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { CreateResourcePopover } from '../create-resource'
import { ResourcesTreeView } from '../get-resource'

export const ResourcesPrimarySidebar = observer(() => {
  const { resourceService } = useStore()
  const { popover } = useCui()

  const items: Array<ToolbarItem> = [
    {
      icon: <PlusOutlined />,
      key: MODEL_ACTION.CreateResource.key,
      onClick: () => {
        resourceService.createForm.open()
        popover.open(MODEL_ACTION.CreateResource.key)
      },
      title: 'Add a Resource',
    },
  ]

  return (
    <CuiSidebar
      key={MODEL_UI.SidebarResource.key}
      label="Resources"
      popover={<CreateResourcePopover />}
      views={[
        {
          content: <ResourcesTreeView />,
          key: 'resources',
          label: 'Resources',
          toolbar: { items, title: 'Resources toolbar' },
        },
      ]}
    />
  )
})
