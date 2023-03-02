import type {
  IResourceService,
  IUpdateResourceData,
} from '@codelab/frontend/abstract/core'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { updateResourceSchema } from './updateResourceSchema'

export const UpdateResourceModal = observer<{
  resourceService: IResourceService
}>(({ resourceService }) => {
  const resource = resourceService.updateModal.resource

  const model = {
    id: resource?.id,
    name: resource?.name,
    config: resource?.config.current.values,
    type: resource?.type,
    owner: resource?.owner,
  }

  const onSubmit = (resourceDTO: IUpdateResourceData) =>
    resourceService.update(resourceDTO)

  const closeModal = () => resourceService.updateModal.close()

  return (
    <ModalForm.Modal
      okText="Update Resource"
      onCancel={closeModal}
      open={resourceService.updateModal.isOpen}
    >
      <ModalForm.Form<IUpdateResourceData>
        model={model}
        onSubmit={onSubmit}
        onSubmitError={createNotificationHandler({
          title: 'Error while updating resource',
        })}
        onSubmitSuccess={closeModal}
        schema={updateResourceSchema}
      >
        <AutoFields />
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})
