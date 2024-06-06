import type { IUpdateAuthGuardData } from '@codelab/frontend/abstract/domain'
import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import {
  ResourceFetchConfigField,
  ResourceTestRequest,
} from '@codelab/frontend-application-resource/components'
import { useStore } from '@codelab/frontend-application-shared-store/provider'
import {
  Form,
  FormController,
} from '@codelab/frontend-presentation-view/components/form'
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

  const onSubmit = (authGuardDto: IUpdateAuthGuardData) => {
    void authGuardService.update(authGuardDto)

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
      uiKey={MODEL_ACTION.UpdateAuthGuard.key}
    >
      <AutoFields omitFields={['config']} />
      <ResourceFetchConfigField />
      <ResourceTestRequest
        fetchConfigDataFieldName="config.data"
        resourceIdFieldName="resource.id"
      />

      <FormController submitLabel="Update Auth Guard" />
    </Form>
  )
})
