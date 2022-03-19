import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoField, AutoFields } from 'uniforms-antd'
import { StateStore } from '../../store'
import { DisplayIfParent } from '../create-store/DisplayIfParent'
import { UpdateStoreInput, updateStoreSchema } from './updateStoreSchema'

export interface UpdateStoreModalProps {
  stateStore: StateStore
}

export const UpdateStoreModal = observer<UpdateStoreModalProps>(
  ({ stateStore }) => {
    const closeModal = () => stateStore.updateModal.close()
    const updateStore = stateStore.updateModal.store

    const onSubmit = async (data: UpdateStoreInput) => {
      if (!updateStore) {
        throw new Error('Updated store is not set')
      }

      return updateStore.update(data)
    }

    const onSubmitError = createNotificationHandler({
      title: 'Error while updating store',
    })

    const selectedStore = stateStore.updateModal.store

    const model = {
      name: selectedStore?.name,
      parentStore: {
        id: selectedStore?.parentStore?.id,
        key: selectedStore?.parentStoreKey,
      },
    }

    return (
      <ModalForm.Modal
        okText="Update Store"
        onCancel={closeModal}
        visible={stateStore.updateModal.isOpen}
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
