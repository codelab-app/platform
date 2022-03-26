import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoField, AutoFields } from 'uniforms-antd'
import { WithStoreService } from '../../../store'
import { DisplayIfParent } from '../create-store/DisplayIfParent'
import { UpdateStoreInput, updateStoreSchema } from './updateStoreSchema'

export const UpdateStoreModal = observer<WithStoreService>(
  ({ storeService }) => {
    const closeModal = () => storeService.updateModal.close()
    const updateStore = storeService.updateModal.store

    const onSubmit = async (data: UpdateStoreInput) => {
      if (!updateStore) {
        throw new Error('Updated store is not set')
      }

      return storeService.updateStore(updateStore, data)
    }

    const onSubmitError = createNotificationHandler({
      title: 'Error while updating store',
    })

    const selectedStore = storeService.updateModal.store

    const model = {
      name: selectedStore?.name,
      parentStore: {
        id: selectedStore?.parentStore?.id,
      },
    }

    return (
      <ModalForm.Modal
        okText="Update Store"
        onCancel={closeModal}
        visible={storeService.updateModal.isOpen}
      >
        <ModalForm.Form<UpdateStoreInput>
          model={model}
          onSubmit={onSubmit}
          onSubmitError={onSubmitError}
          onSubmitSuccess={closeModal}
          schema={updateStoreSchema}
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
