import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { emptyJsonSchema, ModalForm } from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { StateStore } from '../../store'

export interface DeleteStoresModalProps {
  stateStore: StateStore
}

export const DeleteStoresModal = observer<DeleteStoresModalProps>(
  ({ stateStore }) => {
    const closeModal = () => stateStore.deleteModal.close()

    const onSubmit = () =>
      stateStore.delete(stateStore.deleteModal.stores?.map((a) => a.id) ?? [])

    const onSubmitError = createNotificationHandler({
      title: 'Error while deleting store',
    })

    return (
      <ModalForm.Modal
        className="delete-stores-modal"
        okText="Delete Store"
        onCancel={closeModal}
        title="Delete Confirmation"
        visible={stateStore.deleteModal.isOpen}
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
            {stateStore.deleteModal.stores?.map((a) => a.name).join(', ')}"?
          </h4>
          <AutoFields />
        </ModalForm.Form>
      </ModalForm.Modal>
    )
  },
)
