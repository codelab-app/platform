import type { ICreateRedirectData } from '@codelab/frontend/abstract/domain'
import {
  MODEL_ACTION,
  type SubmitController,
} from '@codelab/frontend/abstract/types'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import { useStore } from '@codelab/frontend-application-shared-store/provider'
import {
  DisplayIfField,
  Form,
  FormController,
} from '@codelab/frontend-presentation-view/components/form'
import { IRedirectTargetType } from '@codelab/shared/abstract/core'
import type { Maybe } from '@codelab/shared/abstract/types'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoField, AutoFields } from 'uniforms-antd'
import { v4 } from 'uuid'
import { createRedirectSchema } from './create-redirect.schema'
import { DisplayIf } from '@codelab/frontend-presentation-view/components/conditionalView'

interface CreateRedirectFormProps {
  showFormControl?: boolean
  submitRef?: React.MutableRefObject<Maybe<SubmitController>>
  onSubmitSuccess?(): void
}

export const CreateRedirectForm = observer<CreateRedirectFormProps>(
  ({ onSubmitSuccess, showFormControl = true, submitRef }) => {
    const { redirectService } = useStore()
    const closeForm = () => redirectService.createForm.close()

    const onSubmit = async (redirectDTO: ICreateRedirectData) => {
      await redirectService.create(redirectDTO)

      closeForm()
      onSubmitSuccess?.()

      return Promise.resolve()
    }

    const model = {
      id: v4(),
      source: {
        id: redirectService.createForm.metadata?.id,
      },
    }

    return (
      <Form<ICreateRedirectData>
        model={model}
        onSubmit={onSubmit}
        onSubmitError={createFormErrorNotificationHandler({
          title: 'Error while creating redirect',
        })}
        onSubmitSuccess={closeForm}
        schema={createRedirectSchema}
        submitRef={submitRef}
        uiKey={MODEL_ACTION.CreateRedirect.key}
      >
        <AutoFields omitFields={['targetPage', 'targetUrl']} />

        <DisplayIfField<ICreateRedirectData>
          condition={(context) =>
            context.model.targetType === IRedirectTargetType.Page
          }
        >
          <AutoField name="targetPage" />
        </DisplayIfField>

        <DisplayIfField<ICreateRedirectData>
          condition={(context) =>
            context.model.targetType === IRedirectTargetType.Url
          }
        >
          <AutoField name="targetUrl" />
        </DisplayIfField>

        <DisplayIf condition={showFormControl}>
          <FormController onCancel={closeForm} submitLabel="Add Redirect" />
        </DisplayIf>
      </Form>
    )
  },
)
