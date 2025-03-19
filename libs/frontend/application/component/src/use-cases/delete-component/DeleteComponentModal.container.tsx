import { ComponentConnector } from '@codelab/frontend/infra/connector'

import { DeleteComponentModal } from './DeleteComponentModal'

export const DeleteComponentModalContainer = ({ id }: { id: string }) => {
  return (
    <ComponentConnector id={id}>
      {(component) => <DeleteComponentModal component={component} />}
    </ComponentConnector>
  )
}
