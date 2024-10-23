import type { IAuthGuardCreateFormData } from '@codelab/frontend/abstract/domain'
import type { Maybe } from '@codelab/shared/abstract/types'

import {
  type IFormController,
  type SubmitController,
  UiKey,
} from '@codelab/frontend/abstract/types'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import {
  ResourceFetchConfigField,
  ResourceTestRequest,
} from '@codelab/frontend-application-resource/components'
import {
  Form,
  FormController,
} from '@codelab/frontend-presentation-components-form'
import { DisplayIf } from '@codelab/frontend-presentation-view/components/conditionalView'
import { observer } from 'mobx-react-lite'
import { AutoFields } from 'uniforms-antd'
import { v4 } from 'uuid'

import { useAuthGuardService } from '../../services'
import { createAuthGuardSchema } from './create-auth-guard.schema'
import { useCreateAuthGuardForm } from './create-auth-guard.state'

export const CreateAuthGuardForm = observer<IFormController>(
  ({ onSubmitSuccess, showFormControl = true, submitRef }) => {
    const authGuardService = useAuthGuardService()
    const createAuthGuardForm = useCreateAuthGuardForm()
    const closeForm = () => createAuthGuardForm.close()

    const onSubmit = (authGuardData: IAuthGuardCreateFormData) => {
      void authGuardService.create(authGuardData)

      closeForm()
      onSubmitSuccess?.()

      return Promise.resolve()
    }

    return (
      <Form<IAuthGuardCreateFormData>
        model={{ id: v4() }}
        onSubmit={onSubmit}
        onSubmitError={createFormErrorNotificationHandler({
          title: 'Error while creating resource',
        })}
        onSubmitSuccess={closeForm}
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
          <FormController onCancel={closeForm} submitLabel="Create Type" />
        </DisplayIf>
      </Form>
    )
  },
)
