'use client'

import type { ICreateAuthGuardData } from '@codelab/frontend/abstract/domain'
import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import {
  ResourceFetchConfigField,
  ResourceTestRequest,
} from '@codelab/frontend-application-resource/components'
import { ModalForm } from '@codelab/frontend-presentation-components-form'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { v4 } from 'uuid'
import { useAuthGuardService } from '../../services'
import { createAuthGuardSchema } from './create-auth-guard.schema'
import { useCreateAuthGuardForm } from './create-auth-guard.state'

export const CreateAuthGuardModal = () => {
  const createAuthGuardForm = useCreateAuthGuardForm()
  const authGuardService = useAuthGuardService()

  const onSubmit = async (data: ICreateAuthGuardData) => {
    closeModal()

    return await authGuardService.create(data)
  }

  const closeModal = () => createAuthGuardForm.close()

  const model = {
    id: v4(),
  }

  return (
    <ModalForm.Modal
      okText="Create Auth Guard"
      onCancel={closeModal}
      open={createAuthGuardForm.isOpen}
    >
      <ModalForm.Form<ICreateAuthGuardData>
        model={model}
        onSubmit={onSubmit}
        onSubmitError={createFormErrorNotificationHandler({
          title: 'Error while creating auth guard',
        })}
        onSubmitSuccess={closeModal}
        schema={createAuthGuardSchema}
        uiKey={MODEL_ACTION.CreateAuthGuard.key}
      >
        <AutoFields omitFields={['config']} />
        <ResourceFetchConfigField />
        <ResourceTestRequest
          fetchConfigDataFieldName="config.data"
          resourceIdFieldName="resource.id"
        />
      </ModalForm.Form>
    </ModalForm.Modal>
  )
}
