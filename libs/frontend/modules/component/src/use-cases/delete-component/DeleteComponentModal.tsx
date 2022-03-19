import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { ComponentStore } from '../../store/ComponentStore'
import { deleteComponentSchema } from './deleteComponentSchema'
import { DeleteComponentInput } from './types'

export interface DeleteComponentModal {
  componentStore: ComponentStore
}

export const DeleteComponentModal = observer<DeleteComponentModal>(
  ({ componentStore }) => {
    const closeModal = () => componentStore.deleteModal.close()

    const onSubmit = ({ componentId }: DeleteComponentInput) =>
      componentStore.delete(componentId)

    if (!componentStore.deleteModal.component) {
      return null
    }

    const model = { componentId: componentStore.deleteModal.component.id }

    return (
      <ModalForm.Modal
        okText="Delete Component"
        onCancel={closeModal}
        visible={componentStore.deleteModal.isOpen}
      >
        <ModalForm.Form<DeleteComponentInput>
          model={model}
          onSubmit={onSubmit}
          onSubmitError={createNotificationHandler({
            title: 'Error while deleting component',
          })}
          onSubmitSuccess={closeModal}
          schema={deleteComponentSchema}
        >
          <h4>
            Are you sure you want to delete component "
            {componentStore.deleteModal.component.name}"?
          </h4>
          <AutoFields omitFields={['componentId']} />
        </ModalForm.Form>
      </ModalForm.Modal>
    )
  },
)
