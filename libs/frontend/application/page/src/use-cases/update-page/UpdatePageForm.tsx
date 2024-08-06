import {
  MODEL_ACTION,
  type SubmitController,
} from '@codelab/frontend/abstract/types'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import {
  Form,
  FormController,
} from '@codelab/frontend-presentation-components-form'
import { DisplayIf } from '@codelab/frontend-presentation-view/components/conditionalView'
import type { IUpdatePageData } from '@codelab/shared/abstract/core'
import type { Maybe } from '@codelab/shared/abstract/types'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { usePageService } from '../../services'
import { type UpdatePageSchema, updatePageSchema } from './update-page.schema'
import { useUpdatePageForm } from './update-page.state'

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
    const { appDomainService } = useDomainStore()
    const pageService = usePageService()
    const updatePageForm = useUpdatePageForm()
    const pageToUpdate = updatePageForm.data?.current
    const closeForm = () => updatePageForm.close()

    const onSubmit = (data: IUpdatePageData) => {
      void pageService.update(data)
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
