'use client'

import type { ICreateResourceData } from '@codelab/shared/abstract/core'

import { UiKey } from '@codelab/frontend/abstract/types'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import { useUser } from '@codelab/frontend-application-user/services'
import { ModalForm } from '@codelab/frontend-presentation-components-form'
import { observer } from 'mobx-react-lite'
import { AutoFields } from 'uniforms-antd'
import { v4 } from 'uuid'

import { useResourceService } from '../../services'
import { createResourceSchema } from './create-resource.schema'
import { useCreateResourceModal } from './create-resource.state'

export const CreateResourceModal = observer(() => {
  const user = useUser()
  const resourceService = useResourceService()
  const createResourceModal = useCreateResourceModal()
  const closeModal = () => createResourceModal.close()

  const onSubmit = (resourceDto: ICreateResourceData) => {
    void resourceService.create(resourceDto)

    closeModal()

    return Promise.resolve()
  }

  const model = {
    id: v4(),
    owner: {
      auth0Id: user.auth0Id,
    },
    type: createResourceModal.data?.type,
  }

  return (
    <ModalForm.Modal
      okText="Create Resource"
      onCancel={closeModal}
      open={createResourceModal.isOpen}
      uiKey={UiKey.ResourceModalCreate}
    >
      <ModalForm.Form
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
