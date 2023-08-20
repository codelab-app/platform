import { PlusOutlined } from '@ant-design/icons'
import { FormNames } from '@codelab/frontend/abstract/types'
import type { ToolbarItem } from '@codelab/frontend/presentation//codelab-ui'
import { CuiSidebar, useCui } from '@codelab/frontend/presentation//codelab-ui'
import { useStore } from '@codelab/frontend/presentation/container'
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
      key: 'resource',
      onClick: () => {
        resourceService.createForm.open()
        popover.open(FormNames.CreateResource)
      },
      title: 'Add a Resource',
    },
  ]

  return (
    <CuiSidebar
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
