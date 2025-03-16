import { ComponentConnector } from '../../views'
import { DeleteComponentModal } from './DeleteComponentModal'

export const DeleteComponentModalContainer = ({ id }: { id: string }) => {
  return (
    <ComponentConnector id={id}>
      {(component) => <DeleteComponentModal component={component} />}
    </ComponentConnector>
  )
}
