'use client'

import type {
  IAppModel,
  IAppUpdateFormData,
} from '@codelab/frontend/abstract/domain'

import { RoutePaths } from '@codelab/frontend/abstract/application'
import { UiKey } from '@codelab/frontend/abstract/types'
import { ModalForm } from '@codelab/frontend-presentation-components-form'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'
import { AutoFields } from 'uniforms-antd'

import { useAppService } from '../../services'
import { updateAppSchema } from './update-app.schema'

export const UpdateAppModal = observer<{ app?: IAppModel }>(({ app }) => {
  const router = useRouter()
  const appService = useAppService()

  // Create model with proper defaults if app doesn't exist
  const model = {
    id: app?.id,
    name: app?.name,
  }

  const onSubmit = appService.update
  const closeModal = () => router.push(RoutePaths.AppList())
  const isLoading = !app

  return (
    <ModalForm.Modal
      isLoading={isLoading}
      okText="Update App"
      onCancel={closeModal}
      open={true}
      uiKey={UiKey.AppModalUpdate}
    >
      <ModalForm.Form<IAppUpdateFormData>
        errorMessage="Error while updating app"
        isLoading={isLoading}
        model={model}
        onSubmit={onSubmit}
        onSubmitSuccess={closeModal}
        schema={updateAppSchema}
        successMessage="App updated successfully"
      >
        <AutoFields />
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})
