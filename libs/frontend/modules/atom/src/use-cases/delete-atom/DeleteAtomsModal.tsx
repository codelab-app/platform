import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { emptyJsonSchema, ModalForm } from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { AtomStore } from '../../store'

export interface DeleteAtomsModalProps {
  atomStore: AtomStore
}

export const DeleteAtomsModal = observer<DeleteAtomsModalProps>(
  ({ atomStore }) => {
    const closeModal = () => atomStore.deleteModal.close()

    const onSubmit = () =>
      atomStore.delete(atomStore.deleteModal.atoms?.map((a) => a.id) ?? [])

    const onSubmitError = createNotificationHandler({
      title: 'Error while deleting atom',
    })

    return (
      <ModalForm.Modal
        className="delete-atoms-modal"
        okText="Delete Atom"
        onCancel={closeModal}
        title="Delete Confirmation"
        visible={atomStore.deleteModal.isOpen}
      >
        <ModalForm.Form
          model={{}}
          onSubmit={onSubmit}
          onSubmitError={onSubmitError}
          onSubmitSuccess={closeModal}
          schema={emptyJsonSchema}
        >
          <h4>
            Are you sure you want to delete atoms "
            {atomStore.deleteModal.atoms?.map((a) => a.name).join(', ')}"?
          </h4>
          <AutoFields />
        </ModalForm.Form>
      </ModalForm.Modal>
    )
  },
)
