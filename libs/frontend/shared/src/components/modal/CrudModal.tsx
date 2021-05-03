import {
  ActionType,
  EntityType,
  FormUniformsModal,
  useCRUDModalForm,
} from '@codelab/frontend/shared'
import { ModalProps } from 'antd/lib/modal'
import React, { ReactElement } from 'react'

export type CrudModalProps = {
  entityType: EntityType
  actionType: ActionType
  okText: string
  renderForm: () => ReactElement
  modalProps?: Omit<
    ModalProps,
    'okText' | 'okButtonProps' | 'visible' | 'onCancel'
  >
}

export const CrudModal = ({
  entityType,
  actionType,
  okText = '',
  renderForm,
  modalProps,
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
        ...(modalProps || {}),
      }}
      renderForm={renderForm}
    />
  )
}
