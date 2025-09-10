'use client'

import type {
  IAuthGuardModel,
  IAuthGuardUpdateFormData,
} from '@codelab/frontend-abstract-domain'
import type { IFormController } from '@codelab/frontend-abstract-types'
import type { IResourceFetchConfig } from '@codelab/shared-abstract-core'

import { UiKey } from '@codelab/frontend-abstract-types'
import {
  ResourceFetchConfigField,
  ResourceTestRequest,
} from '@codelab/frontend-application-resource/components'
import { useDomainStore } from '@codelab/frontend-infra-mobx-context'
import {
  Form,
  FormController,
} from '@codelab/frontend-presentation-components-form'
import { DisplayIf } from '@codelab/frontend-presentation-view/components/conditionalView'
import { observer } from 'mobx-react-lite'
import { useMemo } from 'react'
import { AutoFields } from 'uniforms-antd'

import { useAuthGuardService } from '../../services'
import { updateAuthGuardSchema } from './update-auth-guard.schema'

interface UpdateAuthGuardFormProps extends IFormController {
  authGuard: IAuthGuardModel
}

export const UpdateAuthGuardForm = observer<UpdateAuthGuardFormProps>(
  ({ authGuard, onSubmitSuccess, showFormControl = false, submitRef }) => {
    const authGuardService = useAuthGuardService()
    const { resourceDomainService, userDomainService } = useDomainStore()

    const model = {
      config: {
        data: authGuard.config.values as IResourceFetchConfig,
        id: authGuard.config.id,
      },
      id: authGuard.id,
      name: authGuard.name,
      resource: { id: authGuard.resource.id },
      owner: { id: userDomainService.currentUser.id },
      responseTransformer: authGuard.responseTransformer,
    } as IAuthGuardUpdateFormData

    const resources = resourceDomainService.getSelectOption()

    const schema = useMemo(
      () => updateAuthGuardSchema({ resources }),
      [resources],
    )

    return (
      <Form<IAuthGuardUpdateFormData>
        errorMessage="Error while updating auth guard"
        model={model}
        onSubmit={authGuardService.update}
        onSubmitSuccess={onSubmitSuccess}
        schema={schema}
        submitRef={submitRef}
        uiKey={UiKey.AuthGuardFormUpdate}
      >
        <AutoFields omitFields={['config', 'owner']} />
        <ResourceFetchConfigField />
        <ResourceTestRequest
          fetchConfigDataFieldName="config.data"
          resourceIdFieldName="resource.id"
        />

        <DisplayIf condition={showFormControl}>
          <FormController submitLabel="Update Auth Guard" />
        </DisplayIf>
      </Form>
    )
  },
)
