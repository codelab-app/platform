import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { emptyJsonSchema, ModalForm } from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { StoreService } from '../../../store'

export interface DeleteStoresModalProps {
  storeService: StoreService
}

export const DeleteStoresModal = observer<DeleteStoresModalProps>(
  ({ storeService }) => {
    const store = storeService.deleteModal.store
    const closeModal = () => storeService.deleteModal.close()

    const onSubmit = () => {
      if (!store) {
        return Promise.reject('Store not defined in DeleteStoreModal')
      }

      return storeService.deleteStoresSubgraph(store.id)
    }

    const onSubmitError = createNotificationHandler({
      title: 'Error while deleting store',
    })

    return (
      <ModalForm.Modal
        className="delete-stores-modal"
        okText="Delete Store"
        onCancel={closeModal}
        title="Delete Confirmation"
        visible={storeService.deleteModal.isOpen}
      >
        <ModalForm.Form
          model={{}}
          onSubmit={onSubmit}
          onSubmitError={onSubmitError}
          onSubmitSuccess={closeModal}
          schema={emptyJsonSchema}
        >
          <h4>
            Are you sure you want to delete stores "
            {storeService.deleteModal.store?.name}"?
          </h4>
          <AutoFields />
        </ModalForm.Form>
      </ModalForm.Modal>
    )
  },
)
