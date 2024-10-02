'use client'

import { UiKey } from '@codelab/frontend/abstract/types'
import { useLoading } from '@codelab/frontend-application-shared-store/loading'
import { ModalForm } from '@codelab/frontend-presentation-components-form'
import { emptyJsonSchema } from '@codelab/frontend-presentation-components-form/schema'
import { observer } from 'mobx-react-lite'

import { useAppService } from '../../services'
import { useDeleteAppModal } from './delete-app.state'

export const DeleteAppModal = observer(() => {
  const deleteAppModal = useDeleteAppModal()
  const appService = useAppService()
  const { setLoading } = useLoading()
  const closeModal = () => deleteAppModal.close()
  const app = deleteAppModal.data

  const onSubmit = async () => {
    if (!app) {
      return Promise.reject()
    }

    void appService.removeMany([app])
  }

  return (
    <ModalForm.Modal
      okText="Delete App"
      onCancel={closeModal}
      open={deleteAppModal.isOpen}
      uiKey={UiKey.AppModalDelete}
    >
      <ModalForm.Form
        errorMessage="Error while deleting app"
        model={{}}
        onSubmit={onSubmit}
        onSubmitOptimistic={closeModal}
        onSubmitSuccess={() => setLoading(false)}
        schema={emptyJsonSchema}
        successMessage="App deleted successfully"
      >
        <h4>Are you sure you want to delete app "{app?.name}"?</h4>
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})
