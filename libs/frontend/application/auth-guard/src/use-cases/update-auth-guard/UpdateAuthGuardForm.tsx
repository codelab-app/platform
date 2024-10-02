'use client'

import type { IUpdateAuthGuardData } from '@codelab/frontend/abstract/domain'
import type { Context } from 'uniforms'

import { UiKey } from '@codelab/frontend/abstract/types'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import {
  ResourceFetchConfigField,
  ResourceTestRequest,
} from '@codelab/frontend-application-resource/components'
import { useResourceService } from '@codelab/frontend-application-resource/services'
import {
  Form,
  FormController,
} from '@codelab/frontend-presentation-components-form'
import { observer } from 'mobx-react-lite'
import { AutoFields } from 'uniforms-antd'

import { useAuthGuardService } from '../../services'
import { updateAuthGuardSchema } from './update-auth-guard.schema'
import { useUpdateAuthGuardModal } from './update-auth-guard.state'

export const UpdateAuthGuardForm = observer(() => {
  const authGuardService = useAuthGuardService()
  const resourceService = useResourceService()
  const updateAuthGuardModal = useUpdateAuthGuardModal()
  const authGuard = updateAuthGuardModal.data?.current

  if (!authGuard) {
    return null
  }

  const model = {
    config: {
      data: authGuard.config.values,
      id: authGuard.config.id,
    },
    id: authGuard.id,
    name: authGuard.name,
    resource: authGuard.resource,
    responseTransformer: authGuard.responseTransformer,
  }

  const onSubmit = (authGuardDto: IUpdateAuthGuardData) => {
    void authGuardService.update(authGuardDto)

    return Promise.resolve()
  }

  const getResource = (context: Context<IUpdateAuthGuardData>) => {
    const resourceId = context.model.resource?.id

    return resourceId
      ? resourceService.getOneFromCache({ id: resourceId })
      : null
  }

  return (
    <Form<IUpdateAuthGuardData>
      model={model}
      onSubmit={onSubmit}
      onSubmitError={createFormErrorNotificationHandler({
        title: 'Error while updating auth guard',
      })}
      schema={updateAuthGuardSchema}
      uiKey={UiKey.AuthGuardFormUpdate}
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
