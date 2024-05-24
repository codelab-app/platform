import {
  MODEL_ACTION,
  type SubmitController,
} from '@codelab/frontend/abstract/types'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import { useStore } from '@codelab/frontend-application-shared-store/provider'
import {
  DisplayIf,
  Form,
  FormController,
} from '@codelab/frontend-presentation-view/components'
import type { IUpdatePageData } from '@codelab/shared/abstract/core'
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

    const model: Partial<IUpdatePageData> = {
      app: pageToUpdate?.app,
      id: pageToUpdate?.id,
      name: pageToUpdate?.name,
      urlPattern: pageToUpdate?.urlPattern,
    }

    return (
      <Form<UpdatePageSchema>
        model={model}
        onSubmit={onSubmit}
        onSubmitError={createFormErrorNotificationHandler({
          title: 'Error while creating page',
        })}
        onSubmitSuccess={closeForm}
        schema={updatePageSchema}
        submitRef={submitRef}
        uiKey={MODEL_ACTION.UpdatePage.key}
      >
        <AutoFields />
        <DisplayIf condition={showFormControl}>
          <FormController onCancel={closeForm} submitLabel="Update Page" />
        </DisplayIf>
      </Form>
    )
  },
)
