import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { useCurrentStore } from '../../../hooks'
import { WithActionService, WithStoreService } from '../../../store'
import { CreateActionInput, createActionSchema } from './createActionSchema'

type CreateActionModalProp = WithActionService & WithStoreService

export const CreateActionModal = observer<CreateActionModalProp>(
  ({ actionService, storeService }) => {
    const { store } = useCurrentStore(storeService)
    const closeModal = () => actionService.createModal.close()

    const onSubmit = (input: CreateActionInput) =>
      actionService.createAction(input, store?.id)

    const onSubmitError = createNotificationHandler({
      title: 'Error while creating action',
    })

    return (
      <ModalForm.Modal
        okText="Create Action"
        onCancel={closeModal}
        visible={actionService.createModal.isOpen}
      >
        <ModalForm.Form
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
