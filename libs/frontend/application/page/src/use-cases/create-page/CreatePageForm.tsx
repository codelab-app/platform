import type { ICreatePageFormData } from '@codelab/frontend/abstract/domain'
import {
  MODEL_ACTION,
  type SubmitController,
} from '@codelab/frontend/abstract/types'
import { useStore } from '@codelab/frontend/application/shared/store'
import { useCurrentApp } from '@codelab/frontend/presentation/container'
import {
  DisplayIf,
  Form,
  FormController,
} from '@codelab/frontend/presentation/view'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import type { Maybe } from '@codelab/shared/abstract/types'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { v4 } from 'uuid'
import { createPageSchema } from './create-page.schema'

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
    const { pageService, userService } = useStore()
    const app = useCurrentApp()

    const model = {
      app: { id: app?.id },
      id: v4(),
      // required for store api
      owner: {
        auth0Id: userService.user.auth0Id,
      },
    }

    const closeForm = () => pageService.createForm.close()

    const onSubmit = async (data: ICreatePageFormData) => {
      await pageService.create(data)
      closeForm()
      onSubmitSuccess?.()

      return Promise.resolve()
    }

    return (
      <Form<ICreatePageFormData>
        key={MODEL_ACTION.CreatePage.key}
        model={model}
        onSubmit={onSubmit}
        onSubmitError={createFormErrorNotificationHandler({
          title: 'Error while creating page',
        })}
        schema={createPageSchema}
        submitRef={submitRef}
      >
        <AutoFields />
        <DisplayIf condition={showFormControl}>
          <FormController onCancel={closeForm} submitLabel="Create Page" />
        </DisplayIf>
      </Form>
    )
  },
)
