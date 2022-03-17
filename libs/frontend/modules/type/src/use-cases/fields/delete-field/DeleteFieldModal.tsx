import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import {
  emptyJsonSchema,
  EmptyJsonSchemaType,
  ModalForm,
} from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'
import { AutoFields } from 'uniforms-antd'
import { InterfaceType, TypeStore } from '../../../store'

interface DeleteFieldModalProps {
  interfaceType: InterfaceType
  typeStore: TypeStore
}

export const DeleteFieldModal = observer<DeleteFieldModalProps>(
  ({ interfaceType, typeStore }) => {
    const closeModal = () => typeStore.fieldDeleteModal.close()

    if (!typeStore.fieldDeleteModal.field) {
      return null
    }

    return (
      <ModalForm.Modal
        className="delete-field-modal"
        okButtonProps={{ danger: true }}
        okText="Delete"
        onCancel={closeModal}
        title={<span css={tw`font-semibold`}>Delete field</span>}
        visible={typeStore.fieldDeleteModal.isOpen}
      >
        <ModalForm.Form<EmptyJsonSchemaType>
          model={{}}
          onSubmit={(input) => {
            if (!typeStore.fieldDeleteModal.field) {
              throw new Error(
                'fieldDeleteModal.field is not defined, set it when opening the modal',
              )
            }

            return typeStore.deleteField(
              interfaceType,
              typeStore.fieldDeleteModal.field.key,
            )
          }}
          onSubmitError={createNotificationHandler({
            title: 'Error while deleting field',
            type: 'error',
          })}
          onSubmitSuccess={closeModal}
          schema={emptyJsonSchema}
        >
          <h4>
            Are you sure you want to delete field "
            {typeStore.fieldDeleteModal.field?.name}"?
          </h4>
          <AutoFields />
        </ModalForm.Form>
      </ModalForm.Modal>
    )
  },
)

DeleteFieldModal.displayName = 'DeleteFieldModal'
