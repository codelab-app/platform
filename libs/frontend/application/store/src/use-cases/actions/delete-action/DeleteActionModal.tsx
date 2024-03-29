import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import { useStore } from '@codelab/frontend/application/shared/store'
import { emptyJsonSchema, ModalForm } from '@codelab/frontend/presentation/view'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'

export const DeleteActionModal = observer(() => {
  const { actionService } = useStore()
  const action = actionService.deleteModal.action
  const closeModal = () => actionService.deleteModal.close()

  const onSubmit = () => {
    if (!action) {
      return Promise.reject()
    }

    return actionService.delete([action])
  }

  return (
    <ModalForm.Modal
      okText="Delete Action"
      onCancel={closeModal}
      open={actionService.deleteModal.isOpen}
      title="Delete Confirmation"
    >
      <ModalForm.Form
        model={{}}
        onSubmit={onSubmit}
        onSubmitError={createFormErrorNotificationHandler({
          title: 'Error while deleting action',
        })}
        onSubmitSuccess={closeModal}
        schema={emptyJsonSchema}
        uiKey={MODEL_ACTION.DeleteAction.key}
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
