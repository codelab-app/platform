import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { emptyJsonSchema, ModalForm } from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { AtomService, WithAtomService } from '../../store'

export const DeleteAtomsModal = observer<WithAtomService>(({ atomService }) => {
  const closeModal = () => atomService.deleteModal.close()

  const onSubmit = () =>
    atomService.delete(atomService.selectedAtoms?.map((a) => a.id) ?? [])

  const onSubmitError = createNotificationHandler({
    title: 'Error while deleting atom',
  })

  return (
    <ModalForm.Modal
      className="delete-atoms-modal"
      okText="Delete Atom"
      onCancel={closeModal}
      title="Delete Confirmation"
      visible={atomService.deleteModal.isOpen}
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
          {atomService.selectedAtoms?.map((a) => a.current.name).join(', ')}"?
        </h4>
        <AutoFields />
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})
