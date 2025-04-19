import type { PageContextParams } from '@codelab/frontend-abstract-application'
import type { IRedirectUpdateFormData } from '@codelab/frontend-abstract-domain'

import { type IFormController, UiKey } from '@codelab/frontend-abstract-types'
import { useDomainStore } from '@codelab/frontend-infra-mobx-context'
import {
  DisplayIfField,
  Form,
  FormController,
} from '@codelab/frontend-presentation-components-form'
import { DisplayIf } from '@codelab/frontend-presentation-view/components/conditionalView'
import { IRedirectTargetType } from '@codelab/shared-abstract-core'
import { observer } from 'mobx-react-lite'
import { AutoField, AutoFields } from 'uniforms-antd'

import { useRedirectService } from '../../services'
import { DeleteRedirectButton } from '../delete-redirect'
import { updateRedirectSchema } from './update-redirect.schema'

interface UpdateRedirectFormProps extends IFormController {
  params: PageContextParams
  redirectId: string
}

export const UpdateRedirectForm = observer<UpdateRedirectFormProps>(
  ({
    onSubmitSuccess,
    params,
    redirectId,
    showFormControl = true,
    submitRef,
  }) => {
    const redirectService = useRedirectService()
    const { redirectDomainService } = useDomainStore()
    const redirect = redirectDomainService.redirects.get(redirectId)

    const model = {
      authGuard: redirect?.authGuard,
      id: redirect?.id,
      source: redirect?.source,
      targetPage: redirect?.targetPage,
      targetType: redirect?.targetType,
      targetUrl: redirect?.targetUrl,
    }

    return (
      <>
        <Form<IRedirectUpdateFormData>
          errorMessage="Error while updating redirect"
          model={model}
          onSubmit={redirectService.update}
          onSubmitSuccess={onSubmitSuccess}
          schema={updateRedirectSchema}
          submitRef={submitRef}
          successMessage="Auth redirect updated successfully"
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
            <FormController submitLabel="Update Redirect" />
          </DisplayIf>
        </Form>
        <DeleteRedirectButton params={params} redirect={redirect} />
      </>
    )
  },
)
