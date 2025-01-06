import type { IRedirectUpdateFormData } from '@codelab/frontend/abstract/domain'

import { type IFormController, UiKey } from '@codelab/frontend/abstract/types'
import {
  DisplayIfField,
  Form,
  FormController,
} from '@codelab/frontend-presentation-components-form'
import { DisplayIf } from '@codelab/frontend-presentation-view/components/conditionalView'
import { IRedirectTargetType } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import { AutoField, AutoFields } from 'uniforms-antd'

import { useRedirectService } from '../../services'
import { DeleteRedirectButton } from '../delete-redirect'
import { updateRedirectSchema } from './update-redirect.schema'
import { useUpdateRedirectForm } from './update-redirect.state'

export const UpdateRedirectForm = observer<IFormController>(
  ({ onSubmitSuccess, showFormControl = true, submitRef }) => {
    const updateRedirectForm = useUpdateRedirectForm()
    const redirectService = useRedirectService()
    const redirect = updateRedirectForm.data
    const closeForm = () => updateRedirectForm.close()

    const model = {
      authGuard: redirect?.authGuard,
      id: redirect?.id,
      source: redirect?.source,
      targetPage: redirect?.targetPage,
      targetType: redirect?.targetType,
      targetUrl: redirect?.targetUrl,
    }

    const onSubmit = async (redirectDTO: IRedirectUpdateFormData) => {
      await redirectService.update(redirectDTO)

      closeForm()
      onSubmitSuccess?.()

      return Promise.resolve()
    }

    return (
      <>
        <Form<IRedirectUpdateFormData>
          errorMessage="Error while updating redirect"
          model={model}
          onSubmit={onSubmit}
          schema={updateRedirectSchema}
          submitRef={submitRef}
          uiKey={UiKey.RedirectFormUpdate}
        >
          <AutoFields omitFields={['targetPage', 'targetUrl']} />

          <DisplayIfField<IRedirectUpdateFormData>
            condition={(context) =>
              context.model.targetType === IRedirectTargetType.Page
            }
          >
            <AutoField name="targetPage" />
          </DisplayIfField>

          <DisplayIfField<IRedirectUpdateFormData>
            condition={(context) =>
              context.model.targetType === IRedirectTargetType.Url
            }
          >
            <AutoField name="targetUrl" />
          </DisplayIfField>

          <DisplayIf condition={showFormControl}>
            <FormController
              onCancel={closeForm}
              submitLabel="Update Redirect"
            />
          </DisplayIf>
        </Form>
        <DeleteRedirectButton redirect={redirect} />
      </>
    )
  },
)
