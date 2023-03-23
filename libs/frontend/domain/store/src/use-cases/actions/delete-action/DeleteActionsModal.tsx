import { useStore } from '@codelab/frontend/presenter/container'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { emptyJsonSchema, ModalForm } from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'

export const DeleteActionsModal = observer(() => {
  const { actionService } = useStore()
  const action = actionService.deleteModal.action
  const closeModal = () => actionService.deleteModal.close()

  const onSubmit = () => {
    if (!action) {
      return Promise.reject()
    }

    return actionService.delete(action)
  }

  const onSubmitError = createNotificationHandler({
    title: 'Error while deleting action',
  })

  return (
    <ModalForm.Modal
      className="delete-actions-modal"
      okText="Delete Action"
      onCancel={closeModal}
      open={actionService.deleteModal.isOpen}
      title="Delete Confirmation"
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
})
