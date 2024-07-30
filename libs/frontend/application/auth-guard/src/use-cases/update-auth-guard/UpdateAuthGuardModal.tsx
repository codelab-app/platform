import type { IUpdateAuthGuardData } from '@codelab/frontend/abstract/domain'
import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend-presentation-components-form'
import { observer } from 'mobx-react-lite'
import React from 'react'
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

  const onSubmit = (authGuardDTO: IUpdateAuthGuardData) => {
    void authGuardService.update(authGuardDTO)

    closeModal()

    return Promise.resolve()
  }

  return (
    <ModalForm.Modal
      okText="Update Auth Guard"
      onCancel={closeModal}
      open={updateAuthGuardModal.isOpen}
    >
      <ModalForm.Form<IUpdateAuthGuardData>
        model={model}
        onSubmit={onSubmit}
        onSubmitError={createFormErrorNotificationHandler({
          title: 'Error while updating auth guard',
        })}
        onSubmitSuccess={closeModal}
        schema={updateAuthGuardSchema}
        uiKey={MODEL_ACTION.UpdateAuthGuard.key}
      >
        <AutoFields />
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})
