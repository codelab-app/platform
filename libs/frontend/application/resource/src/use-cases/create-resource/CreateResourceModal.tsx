import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import { useDomainStore, useStore } from '@codelab/frontend/infra/mobx'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend-presentation-components-form'
import type { ICreateResourceData } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { v4 } from 'uuid'
import { createResourceSchema } from './create-resource.schema'
import { useCreateResourceModal } from './create-resource.state'
import { createResourceUseCase } from './create-resource.use-case'

export const CreateResourceModal = observer(() => {
  const { userService } = useStore()
  const { resourceDomainService } = useDomainStore()
  const createResourceModal = useCreateResourceModal()
  const closeModal = () => createResourceModal.close()

  const onSubmit = (resourceDTO: ICreateResourceData) => {
    void createResourceUseCase(resourceDTO, resourceDomainService)

    closeModal()

    return Promise.resolve()
  }

  const model = {
    id: v4(),
    owner: {
      auth0Id: userService.user.auth0Id,
    },
    type: createResourceModal.data?.type,
  }

  return (
    <ModalForm.Modal
      okText="Create Resource"
      onCancel={closeModal}
      open={createResourceModal.isOpen}
    >
      <ModalForm.Form
        model={model}
        onSubmit={onSubmit}
        onSubmitError={createFormErrorNotificationHandler({
          title: 'Error while creating resource',
        })}
        onSubmitSuccess={closeModal}
        schema={createResourceSchema}
        uiKey={MODEL_ACTION.CreateResource.key}
      >
        <AutoFields />
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})
