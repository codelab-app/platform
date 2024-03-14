import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import { useStore } from '@codelab/frontend/application/shared/store'
import { ModalForm } from '@codelab/frontend/presentation/view'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import type { ICreateResourceData } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { v4 } from 'uuid'
import { createResourceSchema } from './create-resource.schema'

export const CreateResourceModal = observer(() => {
  const { resourceService, userService } = useStore()
  const closeModal = () => resourceService.createModal.close()

  const onSubmit = (resourceDTO: ICreateResourceData) => {
    void resourceService.create(resourceDTO)

    closeModal()

    return Promise.resolve()
  }

  const model = {
    id: v4(),
    owner: {
      auth0Id: userService.user.auth0Id,
    },
    type: resourceService.createModal.metadata?.type,
  }

  return (
    <ModalForm.Modal
      okText="Create Resource"
      onCancel={closeModal}
      open={resourceService.createModal.isOpen}
    >
      <ModalForm.Form
        key={MODEL_ACTION.CreateResource.key}
        model={model}
        onSubmit={onSubmit}
        onSubmitError={createFormErrorNotificationHandler({
          title: 'Error while creating resource',
        })}
        onSubmitSuccess={closeModal}
        schema={createResourceSchema}
      >
        <AutoFields />
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})
