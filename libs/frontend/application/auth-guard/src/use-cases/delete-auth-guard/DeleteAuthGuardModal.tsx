import { MODEL_ACTION, PageType } from '@codelab/frontend/abstract/types'
import { useStore } from '@codelab/frontend/application/shared/store'
import { useAuthGuardQuery } from '@codelab/frontend/presentation/container'
import { emptyJsonSchema, ModalForm } from '@codelab/frontend/presentation/view'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'
import React from 'react'
import { AutoFields } from 'uniforms-antd'

export const DeleteAuthGuardModal = observer(() => {
  const { authGuardService } = useStore()
  const router = useRouter()
  const authGuardId = useAuthGuardQuery()
  const authGuard = authGuardService.deleteModal.authGuard

  const onSubmitSuccess = () => {
    authGuardService.deleteModal.close()

    if (authGuardId === authGuard?.id) {
      void router.push({ pathname: PageType.AuthGuards, query: {} })
    }
  }

  const closeModal = () => authGuardService.deleteModal.close()

  const onSubmit = () => {
    if (!authGuard) {
      return Promise.reject()
    }

    void authGuardService.delete([authGuard])

    closeModal()

    return Promise.resolve()
  }

  const onSubmitError = createFormErrorNotificationHandler({
    title: 'Error while deleting authGuard',
  })

  return (
    <ModalForm.Modal
      okText="Delete authGuard"
      onCancel={onSubmitSuccess}
      open={authGuardService.deleteModal.isOpen}
      title="Delete Confirmation"
    >
      <ModalForm.Form
        model={{}}
        onSubmit={onSubmit}
        onSubmitError={onSubmitError}
        onSubmitSuccess={onSubmitSuccess}
        schema={emptyJsonSchema}
        uiKey={MODEL_ACTION.DeleteAuthGuard.key}
      >
        <h4>Are you sure you want to delete auth guard "{authGuard?.name}"</h4>
        <AutoFields />
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})
