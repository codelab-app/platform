'use client'

import type { ICreateAppData } from '@codelab/frontend/abstract/domain'
import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import { useDomainStore } from '@codelab/frontend-application-shared-store/provider'
import { ModalForm } from '@codelab/frontend-presentation-components-form'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { v4 } from 'uuid'
import { createAppSchema } from './create-app.schema'
import { createAppUseCase } from './create-app.use-case'
import { useCreateAppModal } from './create-app-modal.state'

export const CreateAppModal = () => {
  const createAppModal = useCreateAppModal()
  const domainStore = useDomainStore()

  const onSubmit = async (data: ICreateAppData) => {
    closeModal()

    return await createAppUseCase(
      {
        id: data.id,
        name: data.name,
        owner: domainStore.userDomainService.user,
      },
      domainStore,
    )
  }

  const closeModal = () => createAppModal.close()

  const model = {
    id: v4(),
    name: '',
  }

  return (
    <ModalForm.Modal
      okText="Create App"
      onCancel={closeModal}
      open={createAppModal.isOpen}
    >
      <ModalForm.Form<ICreateAppData>
        model={model}
        onSubmit={onSubmit}
        onSubmitError={createFormErrorNotificationHandler({
          title: 'Error while creating app',
        })}
        onSubmitSuccess={closeModal}
        schema={createAppSchema}
        uiKey={MODEL_ACTION.CreateApp.key}
      >
        <AutoFields />
      </ModalForm.Form>
    </ModalForm.Modal>
  )
}
