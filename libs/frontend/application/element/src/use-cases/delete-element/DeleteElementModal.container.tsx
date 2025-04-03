'use client'

import type { IBuilderRoute } from '@codelab/frontend/abstract/application'

import { ElementConnector } from '@codelab/frontend/infra/connector'

import { DeleteElementModal } from './DeleteElementModal'

export const DeleteElementModalContainer = ({
  context,
  id,
}: {
  id: string
  context: IBuilderRoute
}) => {
  return (
    <ElementConnector id={id}>
      {(element) => <DeleteElementModal context={context} element={element} />}
    </ElementConnector>
  )
}

DeleteElementModalContainer.displayName = 'DeleteElementModalContainer'
