import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { WithActionService } from '../../../store'
import { UpdateActionInput, updateActionSchema } from './updateActionSchema'

export const UpdateActionModal = observer<WithActionService>(
  ({ actionService }) => {
    const closeModal = () => actionService.updateModal.close()

    const onSubmit = (data: UpdateActionInput) => {
      if (!actionService.updateModal.action) {
        throw new Error('Updated action is not set')
      }

      return actionService.updateModal.action.update(data)
    }

    const onSubmitError = createNotificationHandler({
      title: 'Error while updating action',
    })

    const model = {
      name: actionService.updateModal.action?.name,
      body: actionService.updateModal.action?.body,
    }

    return (
      <ModalForm.Modal
        okText="Update Action"
        onCancel={closeModal}
        visible={actionService.updateModal.isOpen}
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
