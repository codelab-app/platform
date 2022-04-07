import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { emptyJsonSchema, ModalForm } from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { WithResourceService } from '../../store'

export const DeleteResourceModal = observer<WithResourceService>(
  ({ resourceService }) => {
    const closeModal = () => resourceService.deleteModal.close()
    const resources = resourceService.deleteModal.resources
    const onSubmit = () => resourceService.delete(resources)

    const onSubmitError = createNotificationHandler({
      title: 'Error while deleting resource',
    })

    return (
      <ModalForm.Modal
        className="delete-resources-modal"
        okText="Delete Resource"
        onCancel={closeModal}
        title="Delete Confirmation"
        visible={resourceService.deleteModal.isOpen}
      >
        <ModalForm.Form
          model={{}}
          onSubmit={onSubmit}
          onSubmitError={onSubmitError}
          onSubmitSuccess={closeModal}
          schema={emptyJsonSchema}
        >
          <h4>
            Are you sure you want to delete resources "
            {resources?.map((resource) => resource.name).join(', ')}"?
          </h4>
          <AutoFields />
        </ModalForm.Form>
      </ModalForm.Modal>
    )
  },
)
