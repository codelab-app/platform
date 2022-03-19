import { useUser } from '@auth0/nextjs-auth0'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoField, AutoFields } from 'uniforms-antd'
import { StateStore } from '../../store'
import { CreateStoreInput, createStoreSchema } from './createStoreSchema'
import { DisplayIfParent } from './DisplayIfParent'

export interface CreateStoreModalProps {
  stateStore: StateStore
}

export const CreateStoreModal = observer<CreateStoreModalProps>(
  ({ stateStore }) => {
    const closeModal = () => stateStore.createModal.close()
    const { user } = useUser()

    const onSubmit = (input: CreateStoreInput) =>
      stateStore.createStore(input, user?.sub)

    const onSubmitError = createNotificationHandler({
      title: 'Error while creating store',
    })

    return (
      <ModalForm.Modal
        okText="Create Store"
        onCancel={closeModal}
        visible={stateStore.createModal.isOpen}
      >
        <ModalForm.Form<CreateStoreInput>
          model={{}}
          onSubmit={onSubmit}
          onSubmitError={onSubmitError}
          onSubmitSuccess={closeModal}
          schema={createStoreSchema}
        >
          <AutoFields omitFields={['parentStore']} />
          <AutoField name="parentStore.id" />
          <DisplayIfParent>
            <AutoField name="parentStore.key" />
          </DisplayIfParent>
        </ModalForm.Form>
      </ModalForm.Modal>
    )
  },
)
