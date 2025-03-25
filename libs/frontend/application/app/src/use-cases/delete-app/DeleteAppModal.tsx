'use client'

import type { IAppModel } from '@codelab/frontend/abstract/domain'

import { RoutePaths } from '@codelab/frontend/abstract/application'
import { UiKey } from '@codelab/frontend/abstract/types'
import { ModalForm } from '@codelab/frontend-presentation-components-form'
import { emptyJsonSchema } from '@codelab/frontend-presentation-components-form/schema'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'

import { useAppService } from '../../services'

export const DeleteAppModal = observer<{ app?: IAppModel }>(({ app }) => {
  const router = useRouter()
  const appService = useAppService()
  const closeModal = () => router.push(RoutePaths.AppList())

  const onSubmit = () =>
    app ? appService.removeMany([app]) : Promise.resolve({})

  const isLoading = !app

  return (
    <ModalForm.Modal
      isLoading={isLoading}
      okText="Delete App"
      onCancel={closeModal}
      open={true}
      uiKey={UiKey.AppModalDelete}
    >
      <ModalForm.Form
        errorMessage="Error while deleting app"
        isLoading={isLoading}
        model={{}}
        onSubmit={onSubmit}
        onSubmitSuccess={closeModal}
        schema={emptyJsonSchema}
        successMessage="App deleted successfully"
      >
        <h4>Are you sure you want to delete app "{app?.name}"?</h4>
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})
