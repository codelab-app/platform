import { TYPE_SERVICE, WithServices } from '@codelab/frontend/abstract/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { InterfaceType } from '../../store'
import { CreateFieldModal } from './create-field'
import { DeleteFieldModal } from './delete-field'
import { UpdateFieldModal } from './update-field'

interface FieldModalsProps extends WithServices<TYPE_SERVICE> {
  type: InterfaceType
}

export const FieldModals = observer<FieldModalsProps>(
  ({ type, typeService }) => (
    <>
      <CreateFieldModal interfaceType={type} typeService={typeService} />
      <UpdateFieldModal interfaceType={type} typeService={typeService} />
      <DeleteFieldModal interfaceType={type} typeService={typeService} />
    </>
  ),
)
