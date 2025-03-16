'use client'

import type { IAppModel } from '@codelab/frontend/abstract/domain'
import type { IPageCreateFormData } from '@codelab/shared/abstract/core'

import { type IFormController, UiKey } from '@codelab/frontend/abstract/types'
import { useUser } from '@codelab/frontend-application-user/services'
import {
  Form,
  FormController,
} from '@codelab/frontend-presentation-components-form'
import { DisplayIf } from '@codelab/frontend-presentation-view/components/conditionalView'
import { observer } from 'mobx-react-lite'
import { AutoFields } from 'uniforms-antd'
import { v4 } from 'uuid'

import { usePageService } from '../../services'
import { createPageSchema } from './create-page.schema'

type ICreatePageFormProps = IFormController & {
  app: IAppModel
}

export const CreatePageForm = observer<ICreatePageFormProps>(
  ({ app, onSubmitSuccess, showFormControl = true, submitRef }) => {
    const user = useUser()
    const pageService = usePageService()

    const model = {
      app: { id: app.id },
      id: v4(),
      // required for store api
      owner: {
        auth0Id: user.auth0Id,
      },
    }

    const closeForm = () => null

    const onSubmit = async (data: IPageCreateFormData) => {
      await pageService.create(data)

      closeForm()
      onSubmitSuccess?.()

      return Promise.resolve()
    }

    return (
      <Form<IPageCreateFormData>
        errorMessage="Error while creating page"
        model={model}
        onSubmit={onSubmit}
        schema={createPageSchema}
        submitRef={submitRef}
        uiKey={UiKey.PageFormCreate}
      >
        <AutoFields />
        <DisplayIf condition={showFormControl}>
          <FormController onCancel={closeForm} submitLabel="Create Page" />
        </DisplayIf>
      </Form>
    )
  },
)
