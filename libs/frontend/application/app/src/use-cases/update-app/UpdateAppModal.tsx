'use client'

import type { IUpdateAppData } from '@codelab/frontend/abstract/domain'
import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import { useDomainStore } from '@codelab/frontend-application-shared-store/provider'
import { ModalForm } from '@codelab/frontend-presentation-components-form'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { updateAppSchema } from './update-app.schema'
import { useUpdateAppModal } from './update-app.state'
import { updateAppUseCase } from './update-app.use-case'

export const UpdateAppModal = observer(() => {
  const updateAppModal = useUpdateAppModal()
  const app = updateAppModal.data

  if (!app) {
    return null
  }

  const model = {
    id: app.id,
    name: app.name,
  }

  const onSubmit = async (data: IUpdateAppData) => {
    return await updateAppUseCase(app, data)
  }

  const closeModal = () => updateAppModal.close()

  return (
    <ModalForm.Modal
      okText="Update App"
      onCancel={closeModal}
      open={updateAppModal.isOpen}
    >
      <ModalForm.Form<IUpdateAppData>
        model={model}
        onSubmit={onSubmit}
        onSubmitError={createFormErrorNotificationHandler({
          title: 'Error while updating app',
        })}
        onSubmitSuccess={closeModal}
        schema={updateAppSchema}
        uiKey={MODEL_ACTION.UpdateApp.key}
      >
        <AutoFields />
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})
