import {
  COMPONENT_SERVICE,
  WithServices,
} from '@codelab/frontend/abstract/core'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { deleteComponentSchema } from './deleteComponentSchema'
import { DeleteComponentInput } from './types'

export const DeleteComponentModal = observer<WithServices<COMPONENT_SERVICE>>(
  ({ componentService }) => {
    const closeModal = () => componentService.deleteModal.close()

    const onSubmit = ({ componentId }: DeleteComponentInput) =>
      componentService.delete(componentId)

    if (!componentService.deleteModal.component) {
      return null
    }

    const model = { componentId: componentService.deleteModal.component.id }

    return (
      <ModalForm.Modal
        okText="Delete Component"
        onCancel={closeModal}
        visible={componentService.deleteModal.isOpen}
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
            {componentService.deleteModal.component.name}"?
          </h4>
          <AutoFields omitFields={['componentId']} />
        </ModalForm.Form>
      </ModalForm.Modal>
    )
  },
)
