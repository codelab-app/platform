import type { IUpdateAuthGuardData } from '@codelab/frontend/abstract/domain'
import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import { useStore } from '@codelab/frontend/application/shared/store'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend-presentation-view/components'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { updateAuthGuardSchema } from './update-auth-guard.schema'

export const UpdateAuthGuardModal = observer(() => {
  const { authGuardService } = useStore()
  const authGuard = authGuardService.updateModal.authGuard

  const model = {
    id: authGuard?.id,
    name: authGuard?.name,
    resource: authGuard?.resource,
  }

  const closeModal = () => authGuardService.updateModal.close()

  const onSubmit = (authGuardDTO: IUpdateAuthGuardData) => {
    void authGuardService.update(authGuardDTO)

    closeModal()

    return Promise.resolve()
  }

  return (
    <ModalForm.Modal
      okText="Update Auth Guard"
      onCancel={closeModal}
      open={authGuardService.updateModal.isOpen}
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
