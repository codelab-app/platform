'use client'

import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { observer } from 'mobx-react-lite'

import { ResourceConnector } from '../../views/Resource.connector'
import { DeleteResourceModal } from './DeleteResourceModal'

export const DeleteResourceModalContainer = observer(
  ({ id }: { id: string }) => {
    return (
      <ResourceConnector id={id}>
        {(resource) => <DeleteResourceModal resource={resource} />}
      </ResourceConnector>
    )
  },
)
