'use client'

import { ResourceConnector } from '../../views'
import { UpdateResourcePopover } from './UpdateResourcePopover'

export const UpdateResourcePopoverContainer = ({ id }: { id: string }) => {
  return (
    <ResourceConnector id={id}>
      {(resource) => <UpdateResourcePopover resource={resource} />}
    </ResourceConnector>
  )
}
