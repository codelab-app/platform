'use client'

import type { IAuthGuardUpdateFormData } from '@codelab/frontend/abstract/domain'

import { UiKey } from '@codelab/frontend/abstract/types'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend-presentation-components-form'
import { observer } from 'mobx-react-lite'
import { AutoFields } from 'uniforms-antd'

import { useAuthGuardService } from '../../services'
import { updateAuthGuardSchema } from './update-auth-guard.schema'
import { useUpdateAuthGuardModal } from './update-auth-guard.state'

export const UpdateAuthGuardModal = observer(() => {
  const authGuardService = useAuthGuardService()
  const updateAuthGuardModal = useUpdateAuthGuardModal()
  const authGuard = updateAuthGuardModal.data?.current

  const model = {
    id: authGuard?.id,
    name: authGuard?.name,
    resource: authGuard?.resource,
  }

  const closeModal = () => updateAuthGuardModal.close()

  const onSubmit = (authGuardDTO: IAuthGuardUpdateFormData) => {
    void authGuardService.update(authGuardDTO)

    closeModal()

    return Promise.resolve()
  }

  return (
    <ModalForm.Modal
      okText="Update Auth Guard"
      onCancel={closeModal}
      open={updateAuthGuardModal.isOpen}
      uiKey={UiKey.AuthGuardModalUpdate}
    >
      <ModalForm.Form<IAuthGuardUpdateFormData>
        model={model}
        onSubmit={onSubmit}
        onSubmitError={createFormErrorNotificationHandler({
          title: 'Error while updating auth guard',
        })}
        onSubmitSuccess={closeModal}
        schema={updateAuthGuardSchema}
      >
        <AutoFields />
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})
