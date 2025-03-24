import type { IAuthGuardCreateFormData } from '@codelab/frontend/abstract/domain'

import { type IFormController, UiKey } from '@codelab/frontend/abstract/types'
import {
  ResourceFetchConfigField,
  ResourceTestRequest,
} from '@codelab/frontend-application-resource/components'
import { useUser } from '@codelab/frontend-application-user/services'
import {
  Form,
  FormController,
} from '@codelab/frontend-presentation-components-form'
import { DisplayIf } from '@codelab/frontend-presentation-view/components/conditionalView'
import { observer } from 'mobx-react-lite'
import { useMemo } from 'react'
import { AutoFields } from 'uniforms-antd'
import { v4 } from 'uuid'

import { useAuthGuardService } from '../../services'
import { createAuthGuardSchema } from './create-auth-guard.schema'

export const CreateAuthGuardForm = ({
  onSubmitSuccess,
  showFormControl = true,
  submitRef,
}: IFormController) => {
  console.log('CreateAuthGuardForm')

  const user = useUser()
  const authGuardService = useAuthGuardService()

  const model = {
    config: { data: {}, id: v4() },
    id: v4(),
    owner: { id: user.id },
  }

  return (
    <Form<IAuthGuardCreateFormData>
      errorMessage="Error while creating resource"
      model={model}
      onSubmit={authGuardService.create}
      onSubmitSuccess={onSubmitSuccess}
      schema={createAuthGuardSchema}
      submitRef={submitRef}
      uiKey={UiKey.AuthGuardFormCreate}
    >
      <AutoFields omitFields={['config']} />
      <ResourceFetchConfigField />
      <ResourceTestRequest
        fetchConfigDataFieldName="config.data"
        resourceIdFieldName="resource.id"
      />
      <DisplayIf condition={showFormControl}>
        <FormController submitLabel="Create Type" />
      </DisplayIf>
    </Form>
  )
}
