import PlusOutlined from '@ant-design/icons/PlusOutlined'
import { MODEL_ACTION, MODEL_UI } from '@codelab/frontend/abstract/types'
import type { ToolbarItem } from '@codelab/frontend/presentation/codelab-ui'
import { CuiSidebar, useCui } from '@codelab/frontend/presentation/codelab-ui'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { CreateResourcePopover } from '../create-resource'
import { useCreateResourceForm } from '../create-resource/create-resource.state'
import { ResourcesTreeView } from '../get-resource'

export const ResourcesPrimarySidebar = observer(() => {
  const { popover } = useCui()
  const createResourceForm = useCreateResourceForm()

  const items: Array<ToolbarItem> = [
    {
      cuiKey: MODEL_ACTION.CreateResource.key,
      icon: <PlusOutlined />,
      onClick: () => {
        createResourceForm.open()
        popover.open(MODEL_ACTION.CreateResource.key)
      },
      title: 'Add a Resource',
    },
  ]

  return (
    <CuiSidebar
      label="Resources"
      popover={<CreateResourcePopover />}
      uiKey={MODEL_UI.SidebarResource.key}
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
