'use client'

import { UiKey } from '@codelab/frontend/abstract/types'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend-presentation-components-form'
import type { IUpdateResourceData } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import { AutoFields } from 'uniforms-antd'
import { useResourceService } from '../../services'
import { updateResourceSchema } from './update-resource.schema'
import { useUpdateResourceModal } from './update-resource.state'

export const UpdateResourceModal = observer(() => {
  const resourceService = useResourceService()
  const updateResourceModal = useUpdateResourceModal()
  const resource = updateResourceModal.data

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
      uiKey={UiKey.UpdateResourceModal}
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
