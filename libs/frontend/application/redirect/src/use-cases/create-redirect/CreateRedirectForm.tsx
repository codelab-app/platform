import type { IRedirectCreateFormData } from '@codelab/frontend/abstract/domain'
import type { Maybe } from '@codelab/shared/abstract/types'

import {
  type IFormController,
  type SubmitController,
  UiKey,
} from '@codelab/frontend/abstract/types'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
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
import { useCreateRedirectForm } from './create-redirect.state'

export const CreateRedirectForm = observer<IFormController>(
  ({ onSubmitSuccess, showFormControl = true, submitRef }) => {
    const redirectService = useRedirectService()
    const createRedirectForm = useCreateRedirectForm()
    const closeForm = () => createRedirectForm.close()

    const onSubmit = async (redirectDTO: IRedirectCreateFormData) => {
      await redirectService.create(redirectDTO)

      closeForm()
      onSubmitSuccess?.()

      return Promise.resolve()
    }

    const model = {
      id: v4(),
      source: {
        id: createRedirectForm.data?.id,
      },
    }

    return (
      <Form<IRedirectCreateFormData>
        model={model}
        onSubmit={onSubmit}
        onSubmitError={createFormErrorNotificationHandler({
          title: 'Error while creating redirect',
        })}
        onSubmitSuccess={closeForm}
        schema={createRedirectSchema}
        submitRef={submitRef}
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
          <FormController onCancel={closeForm} submitLabel="Add Redirect" />
        </DisplayIf>
      </Form>
    )
  },
)
