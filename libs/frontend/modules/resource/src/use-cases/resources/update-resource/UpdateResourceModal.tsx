import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { WithResourceService } from '../../../store'
import {
  UpdateResourceInput,
  updateResourceSchema,
} from './updateResourceSchema'

export const UpdateResourceModal = observer<WithResourceService>(
  ({ resourceService }) => {
    const closeModal = () => resourceService.updateModal.close()
    const updateResource = resourceService.updateModal.resource

    const onSubmit = async (data: UpdateResourceInput) => {
      if (!updateResource) {
        throw new Error('Updated resource is not set')
      }

      return resourceService.update(updateResource, data)
    }

    const onSubmitError = createNotificationHandler({
      title: 'Error while updating resource',
    })

    const model = {
      name: updateResource?.name,
    }

    return (
      <ModalForm.Modal
        okText="Update Resource"
        onCancel={closeModal}
        visible={resourceService.updateModal.isOpen}
      >
        <ModalForm.Form<UpdateResourceInput>
          model={model}
          onSubmit={onSubmit}
          onSubmitError={onSubmitError}
          onSubmitSuccess={closeModal}
          schema={updateResourceSchema}
        >
          <AutoFields omitFields={['data']} />
        </ModalForm.Form>
      </ModalForm.Modal>
    )
  },
)
