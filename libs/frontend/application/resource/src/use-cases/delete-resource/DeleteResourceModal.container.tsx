'use client'

import { ResourceConnector } from '../../views/Resource.connector'
import { DeleteResourceModal } from './DeleteResourceModal'

export const DeleteResourceModalContainer = ({ id }: { id: string }) => {
  return (
    <ResourceConnector id={id}>
      {(resource) => <DeleteResourceModal resource={resource} />}
    </ResourceConnector>
  )
}
