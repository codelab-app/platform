'use client'

import { observer } from 'mobx-react-lite'

import { TypeConnector } from '../../views/Type.connector'
import { DeleteTypeModal } from './DeleteTypeModal'

export const DeleteTypeModalContainer = observer(({ id }: { id: string }) => {
  return (
    <TypeConnector id={id}>
      {(type) => <DeleteTypeModal type={type} />}
    </TypeConnector>
  )
})
