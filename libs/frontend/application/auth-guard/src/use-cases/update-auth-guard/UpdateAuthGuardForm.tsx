import type { IUpdateAuthGuardData } from '@codelab/frontend/abstract/domain'
import { useStore } from '@codelab/frontend/application/shared/store'
import { Form, FormController } from '@codelab/frontend/presentation/view'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { updateAuthGuardSchema } from './update-auth-guard.schema'

export const UpdateAuthGuardForm = observer(() => {
  const { authGuardService } = useStore()
  const authGuard = authGuardService.updateForm.authGuard

  const model = {
    id: authGuard?.id,
    name: authGuard?.name,
    resource: authGuard?.resource,
  }

  const onSubmit = (authGuardDTO: IUpdateAuthGuardData) => {
    void authGuardService.update(authGuardDTO)

    return Promise.resolve()
  }

  return (
    <Form<IUpdateAuthGuardData>
      model={model}
      onSubmit={onSubmit}
      onSubmitError={createFormErrorNotificationHandler({
        title: 'Error while updating auth guard',
      })}
      schema={updateAuthGuardSchema}
    >
      <AutoFields />
      <FormController submitLabel="Update Auth Guard" />
    </Form>
  )
})
