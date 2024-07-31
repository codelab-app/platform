import type { IUpdateRedirectData } from '@codelab/frontend/abstract/domain'
import {
  MODEL_ACTION,
  type SubmitController,
} from '@codelab/frontend/abstract/types'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import {
  DisplayIfField,
  Form,
  FormController,
} from '@codelab/frontend-presentation-components-form'
import { DisplayIf } from '@codelab/frontend-presentation-view/components/conditionalView'
import { IRedirectTargetType } from '@codelab/shared/abstract/core'
import type { Maybe } from '@codelab/shared/abstract/types'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoField, AutoFields } from 'uniforms-antd'
import { useRedirectService } from '../../services'
import { DeleteRedirectButton } from '../delete-redirect'
import { updateRedirectSchema } from './update-redirect.schema'
import { useUpdateRedirectForm } from './update-redirect.state'

interface UpdateRedirectFormProps {
  showFormControl?: boolean
  submitRef?: React.MutableRefObject<Maybe<SubmitController>>
  onSubmitSuccess?(): void
}

export const UpdateRedirectForm = observer<UpdateRedirectFormProps>(
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

    const onSubmit = async (redirectDTO: IUpdateRedirectData) => {
      await redirectService.update(redirectDTO)

      closeForm()
      onSubmitSuccess?.()

      return Promise.resolve()
    }

    return (
      <>
        <Form<IUpdateRedirectData>
          model={model}
          onSubmit={onSubmit}
          onSubmitError={createFormErrorNotificationHandler({
            title: 'Error while updating redirect',
          })}
          schema={updateRedirectSchema}
          submitRef={submitRef}
          uiKey={MODEL_ACTION.UpdateRedirect.key}
        >
          <AutoFields omitFields={['targetPage', 'targetUrl']} />

          <DisplayIfField<IUpdateRedirectData>
            condition={(context) =>
              context.model.targetType === IRedirectTargetType.Page
            }
          >
            <AutoField name="targetPage" />
          </DisplayIfField>

          <DisplayIfField<IUpdateRedirectData>
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
