import type { ICreateAuthGuardData } from '@codelab/frontend/abstract/domain'
import {
  MODEL_ACTION,
  type SubmitController,
} from '@codelab/frontend/abstract/types'
import {
  ResourceFetchConfigField,
  ResourceTestRequest,
} from '@codelab/frontend/application/resource'
import { useStore } from '@codelab/frontend/application/shared/store'
import {
  DisplayIf,
  Form,
  FormController,
} from '@codelab/frontend-presentation-view/components'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import type { Maybe } from '@codelab/shared/abstract/types'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { v4 } from 'uuid'
import { createAuthGuardSchema } from './create-auth-guard.schema'

interface CreateAuthGuardFormProps {
  showFormControl?: boolean
  submitRef?: React.MutableRefObject<Maybe<SubmitController>>
  onSubmitSuccess?(): void
}

export const CreateAuthGuardForm = observer<CreateAuthGuardFormProps>(
  ({ onSubmitSuccess, showFormControl = true, submitRef }) => {
    const { authGuardService, resourceService } = useStore()
    const closeForm = () => authGuardService.createModal.close()

    const onSubmit = (authGuardData: ICreateAuthGuardData) => {
      void authGuardService.create(authGuardData)

      closeForm()
      onSubmitSuccess?.()

      return Promise.resolve()
    }

    return (
      <Form<ICreateAuthGuardData>
        model={{ id: v4() }}
        onSubmit={onSubmit}
        onSubmitError={createFormErrorNotificationHandler({
          title: 'Error while creating resource',
        })}
        onSubmitSuccess={closeForm}
        schema={createAuthGuardSchema}
        submitRef={submitRef}
        uiKey={MODEL_ACTION.CreateAuthGuard.key}
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
