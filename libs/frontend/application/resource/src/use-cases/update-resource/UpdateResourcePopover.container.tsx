'use client'

import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { observer } from 'mobx-react-lite'

import { ResourceConnector } from '../../views/Resource.connector'
import { UpdateResourcePopover } from './UpdateResourcePopover'

export const UpdateResourcePopoverContainer = observer<{ id: string }>(
  ({ id }) => {
    return (
      <ResourceConnector id={id}>
        {(resource) => <UpdateResourcePopover resource={resource} />}
      </ResourceConnector>
    )
  },
)
