'use client'

import { TypeConnector } from '@codelab/frontend/infra/connector'

import { DeleteTypeModal } from './DeleteTypeModal'

export const DeleteTypeModalContainer = ({ id }: { id: string }) => {
  return (
    <TypeConnector id={id}>
      {(type) => <DeleteTypeModal type={type} />}
    </TypeConnector>
  )
}
