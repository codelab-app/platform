'use client'

import { ResourceConnector } from '@codelab/frontend/infra/connector'

import { UpdateResourcePopover } from './UpdateResourcePopover'

export const UpdateResourcePopoverContainer = ({ id }: { id: string }) => {
  return (
    <ResourceConnector id={id}>
      {(resource) => <UpdateResourcePopover resource={resource} />}
    </ResourceConnector>
  )
}
