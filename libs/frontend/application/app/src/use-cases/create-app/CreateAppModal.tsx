'use client'

import type { IAppCreateFormData } from '@codelab/frontend/abstract/domain'

import { RoutePaths } from '@codelab/frontend/abstract/application'
import { UiKey } from '@codelab/frontend/abstract/types'
import { ModalForm } from '@codelab/frontend-presentation-components-form'
import { useRouter } from 'next/navigation'
import { AutoFields } from 'uniforms-antd'
import { v4 } from 'uuid'

import { useAppService } from '../../services'
import { createAppSchema } from './create-app.schema'

export const CreateAppModal = () => {
  const router = useRouter()
  const appService = useAppService()
  const closeModal = () => router.push(RoutePaths.App.list())
  const model = { id: v4(), name: '' }

  return (
    <ModalForm.Modal
      okText="Create App"
      onCancel={closeModal}
      open={true}
      title="Some Title"
      uiKey={UiKey.AppModalCreate}
    >
      <ModalForm.Form<IAppCreateFormData>
        errorMessage="Error while creating app"
        model={model}
        onSubmit={appService.create}
        onSubmitSuccess={closeModal}
        schema={createAppSchema}
        successMessage="App created successfully"
      >
        <AutoFields />
      </ModalForm.Form>
    </ModalForm.Modal>
  )
}
