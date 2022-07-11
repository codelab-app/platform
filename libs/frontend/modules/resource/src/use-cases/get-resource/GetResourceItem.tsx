import { RESOURCE_SERVICE, WithServices } from '@codelab/frontend/abstract/core'
import { IResource } from '@codelab/shared/abstract/core'
import { Card } from 'antd'
import { capitalize } from 'lodash'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { ResourceIcon } from '../../view'
import { ItemDropdown } from './ItemDropdown'

interface GetResourceItemProps extends WithServices<RESOURCE_SERVICE> {
  resource: IResource
}

export const GetResourcesItem = observer<GetResourceItemProps>(
  // eslint-disable-next-line react/jsx-no-useless-fragment
  ({ resourceService, resource }) => (
    <Card
      extra={
        <ItemDropdown resource={resource} resourceService={resourceService} />
      }
      title={
        <>
          <ResourceIcon type={resource.type} />{' '}
          <span>{capitalize(resource.name)}</span>
        </>
      }
    />
  ),
)
