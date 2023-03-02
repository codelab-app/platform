import type {
  ICreateResourceData,
  IResourceService,
  IUserService,
} from '@codelab/frontend/abstract/core'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { v4 } from 'uuid'
import { createResourceSchema } from './createResourceSchema'

export const CreateResourceModal = observer<{
  resourceService: IResourceService
  userService: IUserService
}>(({ resourceService, userService }) => {
  const onSubmit = (resourceDTO: ICreateResourceData) => {
    console.log('submit', resourceDTO)

    return resourceService.create(resourceDTO)
  }

  const closeModal = () => resourceService.createModal.close()

  const model = {
    id: v4(),
    type: resourceService.createModal.metadata?.type,
    owner: {
      auth0Id: userService.user?.auth0Id,
    },
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
