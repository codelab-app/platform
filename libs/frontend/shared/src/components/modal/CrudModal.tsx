import React, { ReactElement } from 'react'
import {
  useCRUDModalForm,
  ActionType,
  EntityType,
  FormUniformsModal,
} from '@codelab/frontend/shared'

export type CrudModalProps = {
  entityType: EntityType
  actionType: ActionType
  okText: string
  renderForm: () => ReactElement
}

export const CrudModal = ({
  entityType,
  actionType,
  okText = '',
  renderForm,
}: CrudModalProps) => {
  const { reset, state } = useCRUDModalForm(entityType)
  const { loading, visibleForm, type } = state

  return (
    <FormUniformsModal
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
