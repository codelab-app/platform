import { IActionService } from '@codelab/frontend/abstract/core'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { emptyJsonSchema, ModalForm } from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'

export const DeleteActionsModal = observer<{ actionService: IActionService }>(
  ({ actionService }) => {
    const action = actionService.deleteModal.action
    const closeModal = () => actionService.deleteModal.close()

    const onSubmit = () => {
      if (!action) {
        return Promise.reject('Action not defined in DeleteActionModal')
      }

      return actionService.delete(action.id)
    }

    const onSubmitError = createNotificationHandler({
      title: 'Error while deleting action',
    })

    return (
      <ModalForm.Modal
        className="delete-actions-modal"
        okText="Delete Action"
        onCancel={closeModal}
        title="Delete Confirmation"
        visible={actionService.deleteModal.isOpen}
      >
        <ModalForm.Form
          model={{}}
          onSubmit={onSubmit}
          onSubmitError={onSubmitError}
          onSubmitSuccess={closeModal}
          schema={emptyJsonSchema}
        >
          <h4>
            Are you sure you want to delete actions "
            {actionService.deleteModal.action?.name}"?
          </h4>
          <AutoFields />
        </ModalForm.Form>
      </ModalForm.Modal>
    )
  },
)
