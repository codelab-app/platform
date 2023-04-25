import { useStore } from '@codelab/frontend/presentation/container'
import { emptyJsonSchema, ModalForm } from '@codelab/frontend/presentation/view'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'

export const DeleteAtomsModal = observer(() => {
  const { atomService } = useStore()
  const atoms = atomService.deleteManyModal.atoms ?? []
  const onSubmit = () => atomService.delete(atoms.map((atom) => atom.id))
  const closeModal = () => atomService.deleteManyModal.close()

  return (
    <ModalForm.Modal
      className="delete-atoms-modal"
      okText="Delete Atom"
      onCancel={closeModal}
      open={atomService.deleteManyModal.isOpen}
      title="Delete Confirmation"
    >
      <ModalForm.Form
        model={{}}
        onSubmit={onSubmit}
        onSubmitError={createNotificationHandler({
          title: 'Error while deleting atom',
        })}
        onSubmitSuccess={closeModal}
        schema={emptyJsonSchema}
      >
        <h4>
          Are you sure you want to delete atoms "
          {atoms.map((atom) => atom.name).join(', ')}"?
        </h4>
        <AutoFields />
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})
