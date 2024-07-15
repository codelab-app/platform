import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import { useStore } from '@codelab/frontend-application-shared-store/provider'
import { ModalForm } from '@codelab/frontend-presentation-components-form'
import type { IUpdateResourceData } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { updateResourceSchema } from './update-resource.schema'
import { useUpdateResourceModal } from './update-resource-modal.state'

export const UpdateResourceModal = observer(() => {
  const { resourceService } = useStore()
  const updateResourceModal = useUpdateResourceModal()
  const resource = updateResourceModal.data?.current

  const model = {
    config: resource?.config.values,
    id: resource?.id,
    name: resource?.name,
    type: resource?.type,
  }

  const closeModal = () => updateResourceModal.close()

  const onSubmit = (resourceDTO: IUpdateResourceData) => {
    void resourceService.update(resourceDTO)

    closeModal()

    return Promise.resolve()
  }

  return (
    <ModalForm.Modal
      okText="Update Resource"
      onCancel={closeModal}
      open={updateResourceModal.isOpen}
    >
      <ModalForm.Form<IUpdateResourceData>
        model={model}
        onSubmit={onSubmit}
        onSubmitError={createFormErrorNotificationHandler({
          title: 'Error while updating resource',
        })}
        onSubmitSuccess={closeModal}
        schema={updateResourceSchema}
        uiKey={MODEL_ACTION.UpdateResource.key}
      >
        <AutoFields />
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})
