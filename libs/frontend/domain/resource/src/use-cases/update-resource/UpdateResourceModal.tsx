import type { IUpdateResourceData } from '@codelab/frontend/abstract/core'
import { useStore } from '@codelab/frontend/presentation/container'
import { ModalForm } from '@codelab/frontend/presentation/view'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { updateResourceSchema } from './update-resource.schema'

export const UpdateResourceModal = observer(() => {
  const { resourceService } = useStore()
  const resource = resourceService.updateModal.resource

  const model = {
    config: resource?.config.current.values,
    id: resource?.id,
    name: resource?.name,
    owner: resource?.owner,
    type: resource?.type,
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
