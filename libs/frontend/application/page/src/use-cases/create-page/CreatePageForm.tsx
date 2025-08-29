'use client'

import { type IFormController, UiKey } from '@codelab/frontend-abstract-types'
import {
  Form,
  FormController,
} from '@codelab/frontend-presentation-components-form'
import { DisplayIf } from '@codelab/frontend-presentation-view/components/conditionalView'
import {
  type IPageCreateFormData,
  IPageKind,
} from '@codelab/shared-abstract-core'
import { observer } from 'mobx-react-lite'
import { AutoFields } from 'uniforms-antd'
import { v4 } from 'uuid'

import { usePageService } from '../../services'
import { createPageSchema } from './create-page.schema'

type ICreatePageFormProps = IFormController & {
  appId: string
}

export const CreatePageForm = observer<ICreatePageFormProps>(
  ({ appId, onSubmitSuccess, showFormControl = true, submitRef }) => {
    const pageService = usePageService()

    const model = {
      app: { id: appId },
      id: v4(),
      kind: IPageKind.Regular,
    } as IPageCreateFormData

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
        <AutoFields omitFields={['app']} />
        <DisplayIf condition={showFormControl}>
          <FormController onCancel={closeForm} submitLabel="Create Page" />
        </DisplayIf>
      </Form>
    )
  },
)
