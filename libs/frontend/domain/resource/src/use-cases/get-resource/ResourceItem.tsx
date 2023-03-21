import type {
  IResource,
  IResourceService,
} from '@codelab/frontend/abstract/core'
import { Card } from 'antd'
import capitalize from 'lodash/capitalize'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { ResourceIcon } from '../../view'
import { ItemDropdown } from './ItemDropdown'

interface ResourceItemProps {
  resource: IResource
  resourceService: IResourceService
}

export const ResourcesItem = observer<ResourceItemProps>(
  // eslint-disable-next-line react/jsx-no-useless-fragment
  ({ resource, resourceService }) => (
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
  ),
)
