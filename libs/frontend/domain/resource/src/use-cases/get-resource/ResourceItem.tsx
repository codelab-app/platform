import type { IResource } from '@codelab/frontend/abstract/core'
import { useStore } from '@codelab/frontend/presentation/container'
import { Card } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { ResourceIcon } from '../../view'
import { ItemDropdown } from './ItemDropdown'

interface ResourceItemProps {
  resource: IResource
}

export const ResourcesItem = observer<ResourceItemProps>(({ resource }) => {
  const { resourceService } = useStore()

  return (
    <Card
      extra={
        <ItemDropdown resource={resource} resourceService={resourceService} />
      }
      title={
        <>
          <ResourceIcon type={resource.type} /> <span>{resource.name}</span>
        </>
      }
    />
  )
})
