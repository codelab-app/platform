import { IAtomService } from '@codelab/frontend/abstract/core'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { emptyJsonSchema, ModalForm } from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'

export const DeleteAtomsModal = observer<{ atomService: IAtomService }>(
  ({ atomService }) => {
    const atoms = atomService.deleteManyModal.atoms ?? []
    const onSubmit = () => atomService.delete(atoms.map((atom) => atom.id))
    const closeModal = () => atomService.deleteManyModal.close()

    return (
      <ModalForm.Modal
        className="delete-atoms-modal"
        okText="Delete Atom"
        onCancel={closeModal}
        title="Delete Confirmation"
        visible={atomService.deleteManyModal.isOpen}
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
  },
)
