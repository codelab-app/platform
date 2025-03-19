import { ElementConnector } from '@codelab/frontend/infra/connector'

import { DeleteElementModal } from './DeleteElementModal'

export const DeleteElementModalContainer = ({ id }: { id: string }) => {
  return (
    <ElementConnector id={id}>
      {(element) => <DeleteElementModal element={element} />}
    </ElementConnector>
  )
}

DeleteElementModalContainer.displayName = 'DeleteElementModalContainer'
