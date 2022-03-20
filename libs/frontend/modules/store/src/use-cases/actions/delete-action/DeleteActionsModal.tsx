import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { emptyJsonSchema, ModalForm } from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { ActionStore } from '../../../store'

export interface DeleteActionsModalProps {
  actionStore: ActionStore
}

export const DeleteActionsModal = observer<DeleteActionsModalProps>(
  ({ actionStore }) => {
    const closeModal = () => actionStore.deleteModal.close()

    const onSubmit = () =>
      actionStore.delete(
        actionStore.deleteModal.actions?.map((a) => a.id) ?? [],
      )

    const onSubmitError = createNotificationHandler({
      title: 'Error while deleting action',
    })

    return (
      <ModalForm.Modal
        className="delete-actions-modal"
        okText="Delete Action"
        onCancel={closeModal}
        title="Delete Confirmation"
        visible={actionStore.deleteModal.isOpen}
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
            {actionStore.deleteModal.actions?.map((a) => a.name).join(', ')}"?
          </h4>
          <AutoFields />
        </ModalForm.Form>
      </ModalForm.Modal>
    )
  },
)
