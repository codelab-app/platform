import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { ActionService } from '../../../store'
import { CreateActionInput, createActionSchema } from './createActionSchema'

export interface CreateActionModalProps {
  selectedStoreId: string
  actionService: ActionService
}

export const CreateActionModal = observer<CreateActionModalProps>(
  ({ actionService, selectedStoreId: storeId }) => {
    const closeModal = () => {
      actionService.createModal.close()
    }

    const onSubmit = (input: CreateActionInput) => {
      return actionService.createAction(input, storeId)
    }

    const onSubmitError = createNotificationHandler({
      title: 'Error while creating action',
    })

    return (
      <ModalForm.Modal
        okText="Create Action"
        onCancel={closeModal}
        visible={actionService.createModal.isOpen}
      >
        <ModalForm.Form<CreateActionInput>
          model={{}}
          onSubmit={onSubmit}
          onSubmitError={onSubmitError}
          onSubmitSuccess={closeModal}
          schema={createActionSchema}
        >
          <AutoFields omitFields={['storeId']} />
        </ModalForm.Form>
      </ModalForm.Modal>
    )
  },
)
