'use client'

import PlusOutlined from '@ant-design/icons/PlusOutlined'
import { UiKey } from '@codelab/frontend/abstract/types'
import type { ToolbarItem } from '@codelab/frontend/presentation/codelab-ui'
import { CuiSidebar, useCui } from '@codelab/frontend/presentation/codelab-ui'
import React from 'react'
import { CreateResourcePopover } from '../use-cases/create-resource'
import { useCreateResourceForm } from '../use-cases/create-resource/create-resource.state'
import { ResourcesTreeView } from '../use-cases/get-resource'

export const ResourcesPrimarySidebar = () => {
  const { popover } = useCui()
  const createResourceForm = useCreateResourceForm()

  const items: Array<ToolbarItem> = [
    {
      cuiKey: UiKey.CreateResourceToolbarItem,
      icon: <PlusOutlined />,
      onClick: () => {
        createResourceForm.open()
        popover.open(UiKey.CreateResourcePopover)
      },
      title: 'Add a Resource',
    },
  ]

  return (
    <CuiSidebar
      label="Resources"
      popover={<CreateResourcePopover />}
      uiKey={UiKey.ResourceSidebar}
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
}
