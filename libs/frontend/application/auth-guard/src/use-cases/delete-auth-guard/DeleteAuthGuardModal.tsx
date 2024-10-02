'use client'

import { PageType, UiKey } from '@codelab/frontend/abstract/types'
import { useAuthGuardQuery } from '@codelab/frontend/presentation/container'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend-presentation-components-form'
import { emptyJsonSchema } from '@codelab/frontend-presentation-components-form/schema'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'

import { useAuthGuardService } from '../../services'
import { useDeleteAuthGuardModal } from './delete-auth-guard.state'

export const DeleteAuthGuardModal = observer(() => {
  const deleteAuthGuardModal = useDeleteAuthGuardModal()
  const router = useRouter()
  const authGuardService = useAuthGuardService()
  const authGuardId = useAuthGuardQuery()
  const authGuard = deleteAuthGuardModal.data?.current
  const closeModal = () => deleteAuthGuardModal.close()

  const onSubmit = async () => {
    if (!authGuard) {
      return Promise.reject()
    }

    return await authGuardService.removeMany([authGuard])
  }

  const onSubmitSuccess = () => {
    closeModal()

    if (authGuardId === authGuard?.id) {
      void router.push(PageType.AuthGuards())
    }
  }

  return (
    <ModalForm.Modal
      okText="Delete Auth Guard"
      onCancel={closeModal}
      open={deleteAuthGuardModal.isOpen}
      title="Delete Confirmation"
      uiKey={UiKey.AuthGuardModalDelete}
    >
      <ModalForm.Form
        model={{}}
        onSubmit={onSubmit}
        onSubmitError={createFormErrorNotificationHandler({
          title: 'Error while deleting auth guard',
        })}
        onSubmitSuccess={onSubmitSuccess}
        schema={emptyJsonSchema}
      >
        <h4>
          Are you sure you want to delete auth guard "{authGuard?.name}
          "?
        </h4>
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})
