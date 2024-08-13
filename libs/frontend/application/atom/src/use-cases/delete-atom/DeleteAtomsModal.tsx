'use client'

import { UiKey } from '@codelab/frontend/abstract/types'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend-presentation-components-form'
import { emptyJsonSchema } from '@codelab/frontend-presentation-components-form/schema'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { useAtomService } from '../../services'
import { useDeleteAtomsModal } from './delete-atoms.state'

export const DeleteAtomsModal = observer(() => {
  const deleteAtomsModal = useDeleteAtomsModal()
  const atomService = useAtomService()
  const atoms = deleteAtomsModal.data ?? []
  const onSubmit = () => atomService.remove(atoms.map((atom) => atom.current))
  const closeModal = () => deleteAtomsModal.close()

  return (
    <ModalForm.Modal
      okText="Delete Atom"
      onCancel={closeModal}
      open={deleteAtomsModal.isOpen}
      title="Delete Confirmation"
      uiKey={UiKey.DeleteAtomsModal}
    >
      <ModalForm.Form
        model={{}}
        onSubmit={onSubmit}
        onSubmitError={createFormErrorNotificationHandler({
          title: 'Error while deleting atom',
        })}
        onSubmitSuccess={closeModal}
        schema={emptyJsonSchema}
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
