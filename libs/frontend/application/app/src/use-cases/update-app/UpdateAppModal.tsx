'use client'

import type { IUpdateAppData } from '@codelab/frontend/abstract/domain'
import { UiKey } from '@codelab/frontend/abstract/types'
import { ModalForm } from '@codelab/frontend-presentation-components-form'
import { observer } from 'mobx-react-lite'
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

  const onSubmit = appService.update
  const closeModal = updateAppModal.close

  return (
    <ModalForm.Modal
      okText="Update App"
      onCancel={closeModal}
      open={updateAppModal.isOpen}
      uiKey={UiKey.UpdateAppModal}
    >
      <ModalForm.Form<IUpdateAppData>
        errorMessage="Error while updating app"
        model={model}
        onSubmit={onSubmit}
        onSubmitOptimistic={closeModal}
        schema={updateAppSchema}
        successMessage="App updated successfully"
      >
        <AutoFields />
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})
