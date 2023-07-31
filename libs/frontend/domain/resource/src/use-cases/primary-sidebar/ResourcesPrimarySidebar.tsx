import type { ToolbarItem } from '@codelab/frontend/presentation//codelab-ui'
import { CuiSidebar } from '@codelab/frontend/presentation//codelab-ui'
import { useStore } from '@codelab/frontend/presentation/container'
import { IResourceType } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { ResourceIcon } from '../../view'
import { ResourcesTreeView } from '../get-resource'

export const ResourcesPrimarySidebar = observer(() => {
  const { resourceService } = useStore()

  const items: Array<ToolbarItem> = [
    {
      icon: <ResourceIcon add type={IResourceType.GraphQL} />,
      key: 'graphql',
      onClick: () =>
        resourceService.createModal.open({ type: IResourceType.GraphQL }),
      title: 'GraphQL API',
    },
    {
      icon: <ResourceIcon add type={IResourceType.Rest} />,
      key: 'rest',
      onClick: () =>
        resourceService.createModal.open({ type: IResourceType.Rest }),
      title: 'Rest API',
    },
  ]

  return (
    <CuiSidebar
      label="Resources"
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
