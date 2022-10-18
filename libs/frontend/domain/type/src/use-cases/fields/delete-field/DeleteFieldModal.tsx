import { IFieldService } from '@codelab/frontend/abstract/core'
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

interface DeleteFieldModalProps {
  fieldService: IFieldService
}

export const DeleteFieldModal = observer<DeleteFieldModalProps>(
  ({ fieldService }) => {
    const closeModal = () => fieldService.deleteModal.close()
    const { field } = fieldService.deleteModal

    if (!field) {
      return null
    }

    return (
      <ModalForm.Modal
        className="delete-field-modal"
        okButtonProps={{ danger: true }}
        okText="Delete"
        onCancel={closeModal}
        title={<span css={tw`font-semibold`}>Delete field</span>}
        visible={fieldService.deleteModal.isOpen}
      >
        <ModalForm.Form<EmptyJsonSchemaType>
          model={{}}
          onSubmit={(input) => {
            return fieldService.delete([field.id])
          }}
          onSubmitError={createNotificationHandler({
            title: 'Error while deleting field',
            type: 'error',
          })}
          onSubmitSuccess={closeModal}
          schema={emptyJsonSchema}
        >
          <h4>
            Are you sure you want to delete field "{field.name ?? field.key}"?
          </h4>
          <AutoFields />
        </ModalForm.Form>
      </ModalForm.Modal>
    )
  },
)

DeleteFieldModal.displayName = 'DeleteFieldModal'
