'use client'

import type { ICreateAppData } from '@codelab/frontend/abstract/domain'

import { UiKey } from '@codelab/frontend/abstract/types'
import { useLoading } from '@codelab/frontend-application-shared-store/loading'
import { ModalForm } from '@codelab/frontend-presentation-components-form'
import { AutoFields } from 'uniforms-antd'
import { v4 } from 'uuid'

import { useAppService } from '../../services'
import { createAppSchema } from './create-app.schema'
import { useCreateAppModal } from './create-app.state'

export const CreateAppModal = () => {
  const createAppModal = useCreateAppModal()
  const appService = useAppService()
  const closeModal = createAppModal.close
  const model = { id: v4(), name: '' }

  return (
    <ModalForm.Modal
      okText="Create App"
      onCancel={closeModal}
      open={createAppModal.isOpen}
      title="Some Title"
      uiKey={UiKey.AppModalCreate}
    >
      <ModalForm.Form<ICreateAppData>
        errorMessage="Error while creating app"
        model={model}
        onSubmit={appService.create}
        onSubmitOptimistic={closeModal}
        schema={createAppSchema}
        successMessage="App created successfully"
      >
        <AutoFields />
      </ModalForm.Form>
    </ModalForm.Modal>
  )
}
