'use client'

import type { IResourceModel } from '@codelab/frontend/abstract/domain'
import type { ToolbarItem } from '@codelab/frontend/presentation/codelab-ui'

import PlusOutlined from '@ant-design/icons/PlusOutlined'
import { UiKey } from '@codelab/frontend/abstract/types'
import { CuiSidebar } from '@codelab/frontend/presentation/codelab-ui'
import { useRouter } from 'next/navigation'

import { useResourceService } from '../services'
import { ResourcesTreeView } from '../use-cases/get-resource'

export const ResourcesPrimarySidebar = ({
  resources,
}: {
  resources: Array<IResourceModel>
}) => {
  const { createPopover } = useResourceService()
  const router = useRouter()

  const items: Array<ToolbarItem> = [
    {
      cuiKey: UiKey.ResourceToolbarItemCreate,
      icon: <PlusOutlined />,
      onClick: () => createPopover.open(router),
      title: 'Add a Resource',
    },
  ]

  return (
    <CuiSidebar
      label="Resources"
      uiKey={UiKey.ResourceSidebar}
      views={[
        {
          content: <ResourcesTreeView resources={resources} />,
          key: 'resources',
          label: 'Resources',
          toolbar: { items, title: 'Resources toolbar' },
        },
      ]}
    />
  )
}
