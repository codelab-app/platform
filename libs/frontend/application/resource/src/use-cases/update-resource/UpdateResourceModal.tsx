import { useStore } from '@codelab/frontend/application/shared/store'
import { ModalForm } from '@codelab/frontend/presentation/view'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import type { IUpdateResourceData } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { updateResourceSchema } from './update-resource.schema'

export const UpdateResourceModal = observer(() => {
  const { resourceService } = useStore()
  const resource = resourceService.updateModal.resource

  const model = {
    config: resource?.config.values,
    id: resource?.id,
    name: resource?.name,
    type: resource?.type,
  }

  const closeModal = () => resourceService.updateModal.close()

  const onSubmit = (resourceDTO: IUpdateResourceData) => {
    void resourceService.update(resourceDTO)

    closeModal()

    return Promise.resolve()
  }

  return (
    <ModalForm.Modal
      okText="Update Resource"
      onCancel={closeModal}
      open={resourceService.updateModal.isOpen}
    >
      <ModalForm.Form<IUpdateResourceData>
        model={model}
        onSubmit={onSubmit}
        onSubmitError={createFormErrorNotificationHandler({
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
