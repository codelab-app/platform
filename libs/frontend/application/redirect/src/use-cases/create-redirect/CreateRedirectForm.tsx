import type { IRedirectCreateFormData } from '@codelab/frontend/abstract/domain'

import { type IFormController, UiKey } from '@codelab/frontend/abstract/types'
import { useValidatedUrlParams } from '@codelab/frontend-application-shared-store/router'
import {
  DisplayIfField,
  Form,
  FormController,
} from '@codelab/frontend-presentation-components-form'
import { DisplayIf } from '@codelab/frontend-presentation-view/components/conditionalView'
import { IRedirectTargetType } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import { AutoField, AutoFields } from 'uniforms-antd'
import { v4 } from 'uuid'

import { useRedirectService } from '../../services'
import { createRedirectSchema } from './create-redirect.schema'

export const CreateRedirectForm = observer<IFormController>(
  ({ onSubmitSuccess, showFormControl = true, submitRef }) => {
    const redirectService = useRedirectService()
    const { pageId } = useValidatedUrlParams()

    const model = {
      id: v4(),
      source: { id: pageId },
    }

    return (
      <Form<IRedirectCreateFormData>
        errorMessage="Error while creating redirect"
        model={model}
        modelTransform={(form, currentModel) => {
          if (currentModel.targetType === IRedirectTargetType.Page) {
            delete currentModel.targetUrl
          } else {
            delete currentModel.targetPage
          }

          return currentModel
        }}
        onSubmit={redirectService.create}
        onSubmitSuccess={onSubmitSuccess}
        schema={createRedirectSchema}
        submitRef={submitRef}
        successMessage="Auth redirect created successfully"
        uiKey={UiKey.RedirectFormCreate}
      >
        <AutoFields omitFields={['targetPage', 'targetUrl']} />

        <DisplayIfField<IRedirectCreateFormData>
          condition={(context) =>
            context.model.targetType === IRedirectTargetType.Page
          }
        >
          <AutoField name="targetPage" />
        </DisplayIfField>

        <DisplayIfField<IRedirectCreateFormData>
          condition={(context) =>
            context.model.targetType === IRedirectTargetType.Url
          }
        >
          <AutoField name="targetUrl" />
        </DisplayIfField>

        <DisplayIf condition={showFormControl}>
          <FormController submitLabel="Add Redirect" />
        </DisplayIf>
      </Form>
    )
  },
)
