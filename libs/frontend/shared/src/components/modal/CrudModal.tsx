import { ModalProps } from 'antd/lib/modal'
import React, { ReactElement } from 'react'
import tw from 'twin.macro'
import { FormUniformsModal } from '../form'
import { ActionType, EntityType, useCRUDModalForm } from './crudModalsState'

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
  modalProps = {},
}: CrudModalProps) => {
  const { reset, state } = useCRUDModalForm(entityType)
  const { loading, visibleForm, type } = state
  const { title } = modalProps

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
        title:
          React.isValidElement(title) || typeof title === 'string' ? (
            <span css={tw`font-semibold`}>{title}</span>
          ) : null,
      }}
      renderForm={renderForm}
    />
  )
}
