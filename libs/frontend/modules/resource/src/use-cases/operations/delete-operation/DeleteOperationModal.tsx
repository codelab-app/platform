import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { emptyJsonSchema, ModalForm } from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { WithOperationService } from '../../../store'

export const DeleteOperationsModal = observer<WithOperationService>(
  ({ operationService }) => {
    const operation = operationService.deleteModal.operation
    const closeModal = () => operationService.deleteModal.close()

    const onSubmit = () => {
      if (!operation) {
        return Promise.reject('Operation not defined in DeleteOperationModal')
      }

      return operationService.delete(operation.id)
    }

    const onSubmitError = createNotificationHandler({
      title: 'Error while deleting operation',
    })

    return (
      <ModalForm.Modal
        className="delete-operations-modal"
        okText="Delete Operation"
        onCancel={closeModal}
        title="Delete Confirmation"
        visible={operationService.deleteModal.isOpen}
      >
        <ModalForm.Form
          model={{}}
          onSubmit={onSubmit}
          onSubmitError={onSubmitError}
          onSubmitSuccess={closeModal}
          schema={emptyJsonSchema}
        >
          <h4>
            Are you sure you want to delete operations "
            {operationService.deleteModal.operation?.name}"?
          </h4>
          <AutoFields />
        </ModalForm.Form>
      </ModalForm.Modal>
    )
  },
)
