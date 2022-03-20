import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { ActionStore } from '../../../store'
import { UpdateActionInput, updateActionSchema } from './updateActionSchema'

export interface UpdateActionModalProps {
  actionStore: ActionStore
}

export const UpdateActionModal = observer<UpdateActionModalProps>(
  ({ actionStore }) => {
    const closeModal = () => actionStore.updateModal.close()

    const onSubmit = (data: UpdateActionInput) => {
      if (!actionStore.updateModal.action) {
        throw new Error('Updated action is not set')
      }

      return actionStore.updateModal.action.update(data)
    }

    const onSubmitError = createNotificationHandler({
      title: 'Error while updating action',
    })

    const model = {
      name: actionStore.updateModal.action?.name,
      body: actionStore.updateModal.action?.body,
    }

    return (
      <ModalForm.Modal
        okText="Update Action"
        onCancel={closeModal}
        visible={actionStore.updateModal.isOpen}
      >
        <ModalForm.Form<UpdateActionInput>
          model={model}
          onSubmit={onSubmit}
          onSubmitError={onSubmitError}
          onSubmitSuccess={closeModal}
          schema={updateActionSchema}
        >
          <AutoFields />
        </ModalForm.Form>
      </ModalForm.Modal>
    )
  },
)
