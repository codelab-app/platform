import type { IUpdatePageData } from '@codelab/frontend/abstract/domain'
import type { SubmitController } from '@codelab/frontend/abstract/types'
import { useStore } from '@codelab/frontend/application/shared/store'
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
import { type UpdatePageSchema, updatePageSchema } from './update-page.schema'

interface CreatePageFormProps {
  showFormControl?: boolean
  submitRef?: React.MutableRefObject<Maybe<SubmitController>>
  onSubmitSuccess?(): void
}

export const UpdatePageForm = observer(
  ({
    onSubmitSuccess,
    showFormControl = true,
    submitRef,
  }: CreatePageFormProps) => {
    const { appService, pageService } = useStore()
    const pageToUpdate = pageService.updateForm.page
    const closeForm = () => pageService.updateForm.close()

    const onSubmit = (data: IUpdatePageData) => {
      void appService.updatePage(data)
      closeForm()
      onSubmitSuccess?.()

      return Promise.resolve()
    }

    const model = {
      app: pageToUpdate?.app,
      id: pageToUpdate?.id,
      name: pageToUpdate?.name,
      url: pageToUpdate?.url,
    }

    return (
      <Form<UpdatePageSchema>
        data-testid="update-page-form"
        model={model}
        onSubmit={onSubmit}
        onSubmitError={createFormErrorNotificationHandler({
          title: 'Error while creating page',
        })}
        onSubmitSuccess={closeForm}
        schema={updatePageSchema}
        submitRef={submitRef}
      >
        <AutoFields />
        <DisplayIf condition={showFormControl}>
          <FormController onCancel={closeForm} submitLabel="Update Page" />
        </DisplayIf>
      </Form>
    )
  },
)
