'use client'

import type { IUpdateAuthGuardData } from '@codelab/frontend/abstract/domain'
import { UiKey } from '@codelab/frontend/abstract/types'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend-presentation-components-form'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { v4 } from 'uuid'
import { useAuthGuardService } from '../../services'
import { createAuthGuardSchema } from './create-auth-guard.schema'
import { useCreateAuthGuardModal } from './create-auth-guard.state'

export const CreateAuthGuardModal = observer(() => {
  const authGuardService = useAuthGuardService()
  const createAuthGuardModal = useCreateAuthGuardModal()
  const closeModal = () => createAuthGuardModal.close()

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
      open={createAuthGuardModal.isOpen}
    >
      <ModalForm.Form<IUpdateAuthGuardData>
        model={model}
        onSubmit={onSubmit}
        onSubmitError={createFormErrorNotificationHandler({
          title: 'Error while creating authGuard',
        })}
        onSubmitSuccess={closeModal}
        schema={createAuthGuardSchema}
        uiKey={UiKey.CreateAuthGuardModal}
      >
        <AutoFields />
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})
