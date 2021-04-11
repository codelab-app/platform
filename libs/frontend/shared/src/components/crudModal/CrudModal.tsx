import React, { ReactElement } from 'react'
import {
  useCRUDModalForm,
  FormType,
  EntityType,
  ModalUniForm,
} from '@codelab/frontend/shared'

export type CrudModalProps = {
  entityType: EntityType
  actionType: FormType
  okText: string
  renderForm: () => ReactElement
}

export const CrudModal: React.FC<CrudModalProps> = ({
  entityType,
  actionType,
  okText = '',
  renderForm,
}) => {
  const { reset, state } = useCRUDModalForm(entityType)
  const { loading, visibleForm, type } = state

  return (
    <ModalUniForm
      modalProps={{
        okText: okText ? okText : actionType,
        okButtonProps: {
          loading,
        },
        visible: type === entityType && actionType === visibleForm,
        onCancel: () => reset(),
      }}
      renderForm={renderForm}
    />
  )
}
