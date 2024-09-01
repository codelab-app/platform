'use client'

import { type SubmitController, UiKey } from '@codelab/frontend/abstract/types'
import { useCurrentApp } from '@codelab/frontend/presentation/container'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import { useUser } from '@codelab/frontend-application-user/services'
import {
  Form,
  FormController,
} from '@codelab/frontend-presentation-components-form'
import { DisplayIf } from '@codelab/frontend-presentation-view/components/conditionalView'
import type { ICreatePageData } from '@codelab/shared/abstract/core'
import type { Maybe } from '@codelab/shared/abstract/types'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { v4 } from 'uuid'
import { usePageService } from '../../services'
import { createPageSchema } from './create-page.schema'
import { useCreatePageForm } from './create-page.state'

interface CreatePageFormProps {
  showFormControl?: boolean
  submitRef?: React.MutableRefObject<Maybe<SubmitController>>
  onSubmitSuccess?(): void
}

export const CreatePageForm = observer(
  ({
    onSubmitSuccess,
    showFormControl = true,
    submitRef,
  }: CreatePageFormProps) => {
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

    const onSubmit = async (data: ICreatePageData) => {
      await pageService.create(data)

      closeForm()
      onSubmitSuccess?.()

      return Promise.resolve()
    }

    return (
      <Form<ICreatePageData>
        model={model}
        onSubmit={onSubmit}
        onSubmitError={createFormErrorNotificationHandler({
          title: 'Error while creating page',
        })}
        schema={createPageSchema}
        submitRef={submitRef}
        uiKey={UiKey.CreatePageForm}
      >
        <AutoFields />
        <DisplayIf condition={showFormControl}>
          <FormController onCancel={closeForm} submitLabel="Create Page" />
        </DisplayIf>
      </Form>
    )
  },
)
