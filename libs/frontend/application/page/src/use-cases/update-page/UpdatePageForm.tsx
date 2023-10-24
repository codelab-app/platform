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
import { getSnapshot } from 'mobx-keystone'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { AuthGuardCompositeField } from '../../components'
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
    const { pageService } = useStore()
    const page = pageService.updateForm.page
    const closeForm = () => pageService.updateForm.close()

    const onSubmit = (data: IUpdatePageData) => {
      void pageService.update(data)
      closeForm()
      onSubmitSuccess?.()

      return Promise.resolve()
    }

    const authGuard = page?.authGuard

    const model = {
      app: page?.app,
      // we don't want to manipulate the mobx object directly inside form
      // we use snapshot or clone
      authGuard: authGuard ? getSnapshot(authGuard) : undefined,
      id: page?.id,
      name: page?.name,
      url: page?.url,
    }

    return (
      <Form<UpdatePageSchema>
        data-testid="update-page-form"
        model={model}
        onChangeModel={(mod) => console.log(mod)}
        onSubmit={onSubmit}
        onSubmitError={createFormErrorNotificationHandler({
          title: 'Error while creating page',
        })}
        onSubmitSuccess={closeForm}
        schema={updatePageSchema}
        submitRef={submitRef}
      >
        <AutoFields omitFields={['authGuard']} />
        <AuthGuardCompositeField name="authGuard" />
        <DisplayIf condition={showFormControl}>
          <FormController onCancel={closeForm} submitLabel="Update Page" />
        </DisplayIf>
      </Form>
    )
  },
)
