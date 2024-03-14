import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import { useStore } from '@codelab/frontend/application/shared/store'
import { emptyJsonSchema, ModalForm } from '@codelab/frontend/presentation/view'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
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
      okText="Delete Atom"
      onCancel={closeModal}
      open={atomService.deleteManyModal.isOpen}
      title="Delete Confirmation"
    >
      <ModalForm.Form
        model={{}}
        onSubmit={onSubmit}
        onSubmitError={createFormErrorNotificationHandler({
          title: 'Error while deleting atom',
        })}
        onSubmitSuccess={closeModal}
        schema={emptyJsonSchema}
        uiKey={MODEL_ACTION.DeleteAtom.key}
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
