'use client'

import type { IPageModel } from '@codelab/frontend-abstract-domain'
import type { IFormController } from '@codelab/frontend-abstract-types'
import type { IPageUpdateFormData } from '@codelab/shared-abstract-core'

import { UiKey } from '@codelab/frontend-abstract-types'
import {
  Form,
  FormController,
} from '@codelab/frontend-presentation-components-form'
import { DisplayIf } from '@codelab/frontend-presentation-view/components/conditionalView'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'
import { AutoFields } from 'uniforms-antd'

import { usePageService } from '../../services'
import { updatePageSchema } from './update-page.schema'

export interface UpdatePageFormProps extends IFormController {
  appId: string
  page: IPageModel
}

export const UpdatePageForm = observer<UpdatePageFormProps>(
  ({ appId, onSubmitSuccess, page, showFormControl = true, submitRef }) => {
    const pageService = usePageService()
    const router = useRouter()

    const closeForm = () =>
      pageService.updatePopover.close(router, { appId, pageId: page.id })

    const model = {
      app: page.app,
      id: page.id,
      name: page.name,
      urlPattern: page.urlPattern,
    }

    return (
      <Form<IPageUpdateFormData>
        errorMessage="Error while creating page"
        model={model}
        onSubmit={pageService.update}
        onSubmitSuccess={onSubmitSuccess}
        schema={updatePageSchema}
        submitRef={submitRef}
        uiKey={UiKey.PageFormUpdate}
      >
        <AutoFields />
        <DisplayIf condition={showFormControl}>
          <FormController onCancel={closeForm} submitLabel="Update Page" />
        </DisplayIf>
      </Form>
    )
  },
)
