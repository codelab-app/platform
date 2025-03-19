'use client'

import { ResourceConnector } from '../../views'
import { DeleteResourceModal } from './DeleteResourceModal'

export const DeleteResourceModalContainer = ({ id }: { id: string }) => {
  return (
    <ResourceConnector id={id}>
      {(resource) => <DeleteResourceModal resource={resource} />}
    </ResourceConnector>
  )
}
