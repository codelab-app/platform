'use client'

import type { IAppUpdateFormData } from '@codelab/frontend/abstract/domain'

import { PageType, UiKey } from '@codelab/frontend/abstract/types'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { ModalForm } from '@codelab/frontend-presentation-components-form'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'
import { AutoFields } from 'uniforms-antd'

import { useAppService } from '../../services'
import { updateAppSchema } from './update-app.schema'

export const UpdateAppModal = observer(({ id }: { id: string }) => {
  const router = useRouter()
  const appService = useAppService()
  const { appDomainService } = useDomainStore()
  const app = appDomainService.apps.get(id)

  if (!app) {
    return null
  }

  const model = {
    id: app.id,
    name: app.name,
  }

  const onSubmit = appService.update
  const closeModal = () => router.push(PageType.AppList())

  return (
    <ModalForm.Modal
      okText="Update App"
      onCancel={closeModal}
      open={true}
      uiKey={UiKey.AppModalUpdate}
    >
      <ModalForm.Form<IAppUpdateFormData>
        errorMessage="Error while updating app"
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
