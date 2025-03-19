import { ElementConnector } from '../../views'
import { DeleteElementModal } from './DeleteElementModal'

export const DeleteElementModalContainer = ({ id }: { id: string }) => {
  return (
    <ElementConnector id={id}>
      {(element) => <DeleteElementModal element={element} />}
    </ElementConnector>
  )
}

DeleteElementModalContainer.displayName = 'DeleteElementModalContainer'
