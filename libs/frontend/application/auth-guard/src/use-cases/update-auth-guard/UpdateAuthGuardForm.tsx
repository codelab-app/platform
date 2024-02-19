import type { IUpdateAuthGuardData } from '@codelab/frontend/abstract/domain'
import {
  ResourceFetchConfig,
  ResourceTestRequest,
} from '@codelab/frontend/application/resource'
import { useStore } from '@codelab/frontend/application/shared/store'
import { Form, FormController } from '@codelab/frontend/presentation/view'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import { observer } from 'mobx-react-lite'
import React from 'react'
import type { Context } from 'uniforms'
import { AutoFields } from 'uniforms-antd'
import { updateAuthGuardSchema } from './update-auth-guard.schema'

export const UpdateAuthGuardForm = observer(() => {
  const { authGuardService, resourceService } = useStore()
  const authGuard = authGuardService.updateForm.authGuard

  const model = {
    config: {
      data: authGuard?.config.values,
      id: authGuard?.config.id,
    },
    id: authGuard?.id,
    name: authGuard?.name,
    resource: authGuard?.resource,
    responseTransformer: authGuard?.responseTransformer,
  }

  const onSubmit = (authGuardDTO: IUpdateAuthGuardData) => {
    void authGuardService.update(authGuardDTO)

    return Promise.resolve()
  }

  const getResource = (context: Context<IUpdateAuthGuardData>) =>
    context.model.resource?.id
      ? resourceService.resource(context.model.resource.id)
      : null

  return (
    <Form<IUpdateAuthGuardData>
      model={model}
      onSubmit={onSubmit}
      onSubmitError={createFormErrorNotificationHandler({
        title: 'Error while updating auth guard',
      })}
      schema={updateAuthGuardSchema}
    >
      <AutoFields omitFields={['config']} />
      <ResourceFetchConfig<IUpdateAuthGuardData> getResource={getResource} />
      <ResourceTestRequest
        fetchConfigDataFieldName="config.data"
        resourceIdFieldName="resource.id"
      />

      <FormController submitLabel="Update Auth Guard" />
    </Form>
  )
})
