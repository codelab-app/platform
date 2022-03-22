import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { useCurrentStoreId } from '../../../hooks'
import { ActionStore } from '../../../store'
import { CreateActionInput, createActionSchema } from './createActionSchema'

export interface CreateActionModalProps {
  actionStore: ActionStore
}

export const CreateActionModal = observer<CreateActionModalProps>(
  ({ actionStore }) => {
    const storeId = useCurrentStoreId()

    const closeModal = () => {
      actionStore.createModal.close()
    }

    const onSubmit = (input: CreateActionInput) => {
      return actionStore.createAction(input, storeId)
    }

    const onSubmitError = createNotificationHandler({
      title: 'Error while creating action',
    })

    return (
      <ModalForm.Modal
        okText="Create Action"
        onCancel={closeModal}
        visible={actionStore.createModal.isOpen}
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
