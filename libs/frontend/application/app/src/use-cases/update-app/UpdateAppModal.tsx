'use client'

import type { IUpdateAppData } from '@codelab/frontend/abstract/domain'
import { UiKey } from '@codelab/frontend/abstract/types'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend-presentation-components-form'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { useAppService } from '../../services'
import { updateAppSchema } from './update-app.schema'
import { useUpdateAppModal } from './update-app.state'

export const UpdateAppModal = observer(() => {
  const appService = useAppService()
  const updateAppModal = useUpdateAppModal()
  const app = updateAppModal.data?.app

  if (!app) {
    return null
  }

  const model = {
    id: app.id,
    name: app.name,
  }

  const onSubmit = async (data: IUpdateAppData) => {
    return await appService.update(data)
  }

  const closeModal = () => updateAppModal.close()

  return (
    <ModalForm.Modal
      okText="Update App"
      onCancel={closeModal}
      open={updateAppModal.isOpen}
      uiKey={UiKey.UpdateAppModal}
    >
      <ModalForm.Form<IUpdateAppData>
        model={model}
        onSubmit={onSubmit}
        onSubmitError={createFormErrorNotificationHandler({
          title: 'Error while updating app',
        })}
        onSubmitSuccess={closeModal}
        schema={updateAppSchema}
      >
        <AutoFields />
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})
