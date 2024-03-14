import type { IUpdateAuthGuardData } from '@codelab/frontend/abstract/domain'
import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import { useStore } from '@codelab/frontend/application/shared/store'
import { ModalForm } from '@codelab/frontend/presentation/view'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { v4 } from 'uuid'
import { createAuthGuardSchema } from './create-auth-guard.schema'

export const CreateAuthGuardModal = observer(() => {
  const { authGuardService } = useStore()
  const closeModal = () => authGuardService.createModal.close()

  const onSubmit = (authGuardData: IUpdateAuthGuardData) => {
    void authGuardService.create(authGuardData)

    closeModal()

    return Promise.resolve()
  }

  const model = { id: v4() }

  return (
    <ModalForm.Modal
      okText="Create Auth Guard"
      onCancel={closeModal}
      open={authGuardService.createModal.isOpen}
    >
      <ModalForm.Form
        key={MODEL_ACTION.CreateAuthGuard.key}
        model={model}
        onSubmit={onSubmit}
        onSubmitError={createFormErrorNotificationHandler({
          title: 'Error while creating authGuard',
        })}
        onSubmitSuccess={closeModal}
        schema={createAuthGuardSchema}
      >
        <AutoFields />
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})
