import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { StateStore } from '../../store'
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

    const model = {
      name: stateStore.updateModal.store?.name,
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
          <AutoFields />
        </ModalForm.Form>
      </ModalForm.Modal>
    )
  },
)
