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
import { InterfaceType, TypeService, WithTypeService } from '../../../store'

type DeleteFieldModalProps = {
  interfaceType: InterfaceType
} & WithTypeService

export const DeleteFieldModal = observer<DeleteFieldModalProps>(
  ({ interfaceType, typeService }) => {
    const closeModal = () => typeService.fieldDeleteModal.close()

    if (!typeService.fieldDeleteModal.field) {
      return null
    }

    return (
      <ModalForm.Modal
        className="delete-field-modal"
        okButtonProps={{ danger: true }}
        okText="Delete"
        onCancel={closeModal}
        title={<span css={tw`font-semibold`}>Delete field</span>}
        visible={typeService.fieldDeleteModal.isOpen}
      >
        <ModalForm.Form<EmptyJsonSchemaType>
          model={{}}
          onSubmit={(input) => {
            if (!typeService.fieldDeleteModal.field) {
              throw new Error(
                'fieldDeleteModal.field is not defined, set it when opening the modal',
              )
            }

            return typeService.deleteField(
              interfaceType,
              typeService.fieldDeleteModal.field.key,
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
            {typeService.fieldDeleteModal.field?.name}"?
          </h4>
          <AutoFields />
        </ModalForm.Form>
      </ModalForm.Modal>
    )
  },
)

DeleteFieldModal.displayName = 'DeleteFieldModal'
