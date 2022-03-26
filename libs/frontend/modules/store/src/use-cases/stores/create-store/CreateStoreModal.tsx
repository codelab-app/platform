import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoField, AutoFields } from 'uniforms-antd'
import { WithStoreService } from '../../../store'
import { CreateStoreInput, createStoreSchema } from './createStoreSchema'
import { DisplayIfParent } from './DisplayIfParent'

export const CreateStoreModal = observer<WithStoreService>(
  ({ storeService }) => {
    const closeModal = () => storeService.createModal.close()

    const onSubmit = (input: CreateStoreInput) =>
      storeService.createStore(input)

    const onSubmitError = createNotificationHandler({
      title: 'Error while creating store',
    })

    const selectedStore = storeService.createModal.store

    const model = {
      parentStore: selectedStore
        ? {
            id: selectedStore?.id,
            storeKey: selectedStore?.storeKey,
          }
        : undefined,
    }

    return (
      <ModalForm.Modal
        okText="Create Store"
        onCancel={closeModal}
        visible={storeService.createModal.isOpen}
      >
        <ModalForm.Form
          model={model}
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
