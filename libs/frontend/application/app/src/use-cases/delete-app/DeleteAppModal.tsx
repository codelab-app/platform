'use client'

import { PageType, UiKey } from '@codelab/frontend/abstract/types'
import { ModalForm } from '@codelab/frontend-presentation-components-form'
import { emptyJsonSchema } from '@codelab/frontend-presentation-components-form/schema'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'

import { useAppService } from '../../services'

export const DeleteAppModal = observer<{ id: string }>(({ id }) => {
  const router = useRouter()
  const appService = useAppService()
  const closeModal = () => router.push(PageType.AppList())
  const app = appService.getOneFromCache({ id })

  if (!app) {
    return null
  }

  const onSubmit = () => appService.removeMany([app])

  return (
    <ModalForm.Modal
      okText="Delete App"
      onCancel={closeModal}
      open={true}
      uiKey={UiKey.AppModalDelete}
    >
      <ModalForm.Form
        errorMessage="Error while deleting app"
        model={{}}
        onSubmit={onSubmit}
        onSubmitOptimistic={() => closeModal()}
        schema={emptyJsonSchema}
        successMessage="App deleted successfully"
      >
        <h4>Are you sure you want to delete app "{app.name}"?</h4>
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})
