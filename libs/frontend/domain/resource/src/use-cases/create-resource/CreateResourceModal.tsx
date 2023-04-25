import type { ICreateResourceData } from '@codelab/frontend/abstract/core'
import { useStore } from '@codelab/frontend/presentation/container'
import { ModalForm } from '@codelab/frontend/presentation/view'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { v4 } from 'uuid'
import { createResourceSchema } from './create-resource.schema'

export const CreateResourceModal = observer(() => {
  const { resourceService, userService } = useStore()

  const onSubmit = (resourceDTO: ICreateResourceData) => {
    console.log('submit', resourceDTO)

    return resourceService.create(resourceDTO)
  }

  const closeModal = () => resourceService.createModal.close()

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
        model={model}
        onSubmit={onSubmit}
        onSubmitError={createNotificationHandler({
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
