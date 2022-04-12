import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import { IUpdateActionDTO } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { WithActionService } from '../../../store'
import { updateActionSchema } from './updateActionSchema'

export const UpdateActionModal = observer<WithActionService>(
  ({ actionService }) => {
    const closeModal = () => actionService.updateModal.close()
    const updateAction = actionService.updateModal.action

    const onSubmit = (data: IUpdateActionDTO) => {
      if (!updateAction) {
        throw new Error('Updated action is not set')
      }

      return actionService.updateAction(updateAction, data)
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
        <ModalForm.Form<IUpdateActionDTO>
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
