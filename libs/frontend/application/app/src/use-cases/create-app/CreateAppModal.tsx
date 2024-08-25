'use client'

import type { ICreateAppData } from '@codelab/frontend/abstract/domain'
import { UiKey } from '@codelab/frontend/abstract/types'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend-presentation-components-form'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { v4 } from 'uuid'
import { useAppService } from '../../services'
import { createAppSchema } from './create-app.schema'
import { useCreateAppModal } from './create-app.state'

export const CreateAppModal = () => {
  const createAppModal = useCreateAppModal()
  const appService = useAppService()

  const onSubmit = async (data: ICreateAppData) => {
    return await appService.create({
      id: data.id,
      name: data.name,
    })
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
      title="Some Title"
      uiKey={UiKey.CreateAppModal}
    >
      <ModalForm.Form<ICreateAppData>
        model={model}
        onSubmit={onSubmit}
        onSubmitError={createFormErrorNotificationHandler({
          title: 'Error while creating app',
        })}
        onSubmitSuccess={closeModal}
        schema={createAppSchema}
      >
        <AutoFields />
      </ModalForm.Form>
    </ModalForm.Modal>
  )
}
