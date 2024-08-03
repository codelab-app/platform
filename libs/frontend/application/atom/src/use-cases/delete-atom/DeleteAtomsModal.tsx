'use client'

import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend-presentation-components-form'
import { emptyJsonSchema } from '@codelab/frontend-presentation-components-form/schema'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { useDeleteAtomsModal } from './delete-atoms.state'
import { deleteAtomsUseCase } from './delete-atoms.use-case'

export const DeleteAtomsModal = observer(() => {
  const deleteAtomsModal = useDeleteAtomsModal()
  const atoms = deleteAtomsModal.data ?? []
  const onSubmit = () => deleteAtomsUseCase(atoms.map((atom) => atom.current))
  const closeModal = () => deleteAtomsModal.close()

  return (
    <ModalForm.Modal
      okText="Delete Atom"
      onCancel={closeModal}
      open={deleteAtomsModal.isOpen}
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
          {atoms.map((atom) => atom.current.name).join(', ')}"?
        </h4>
        <AutoFields />
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})
