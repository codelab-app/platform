'use client'

import type { IPageCreateFormData } from '@codelab/shared/abstract/core'
import type { Maybe } from '@codelab/shared/abstract/types'

import {
  type IFormController,
  type SubmitController,
  UiKey,
} from '@codelab/frontend/abstract/types'
import { useCurrentApp } from '@codelab/frontend/presentation/container'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
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
import { useCreatePageForm } from './create-page.state'

export const CreatePageForm = observer<IFormController>(
  ({ onSubmitSuccess, showFormControl = true, submitRef }) => {
    const user = useUser()
    const app = useCurrentApp()
    const pageService = usePageService()
    const createPageForm = useCreatePageForm()

    const model = {
      app: { id: app?.id },
      id: v4(),
      // required for store api
      owner: {
        auth0Id: user.auth0Id,
      },
    }

    const closeForm = () => createPageForm.close()

    const onSubmit = async (data: IPageCreateFormData) => {
      await pageService.create(data)

      closeForm()
      onSubmitSuccess?.()

      return Promise.resolve()
    }

    return (
      <Form<IPageCreateFormData>
        model={model}
        onSubmit={onSubmit}
        onSubmitError={createFormErrorNotificationHandler({
          title: 'Error while creating page',
        })}
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
