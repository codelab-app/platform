import { ACTION_SERVICE, WithServices } from '@codelab/frontend/abstract/core'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import { IUpdateActionDTO } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { updateActionSchema } from './updateActionSchema'

export const UpdateActionModal = observer<WithServices<ACTION_SERVICE>>(
  ({ actionService }) => {
    const closeModal = () => actionService.updateModal.close()
    const updateAction = actionService.updateModal.action

    const onSubmit = (data: IUpdateActionDTO) => {
      if (!updateAction) {
        throw new Error('Updated action is not set')
      }

      return actionService.update(updateAction, data)
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
