'use client'

import type { IFormController } from '@codelab/frontend/abstract/types'
import type { IPageUpdateFormData } from '@codelab/shared/abstract/core'

import { UiKey } from '@codelab/frontend/abstract/types'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import {
  Form,
  FormController,
} from '@codelab/frontend-presentation-components-form'
import { DisplayIf } from '@codelab/frontend-presentation-view/components/conditionalView'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'
import { AutoFields } from 'uniforms-antd'

import { usePageService } from '../../services'
import { type UpdatePageSchema, updatePageSchema } from './update-page.schema'

export interface UpdatePageFormProps extends IFormController {
  id: string
}

export const UpdatePageForm = observer<UpdatePageFormProps>(
  ({ id, onSubmitSuccess, showFormControl = true, submitRef }) => {
    const pageService = usePageService()
    const router = useRouter()
    const closeForm = () => pageService.updatePopover.close(router)
    const { pageDomainService } = useDomainStore()
    const pageToUpdate = pageDomainService.pages.get(id)

    const model: Partial<IPageUpdateFormData> = {
      app: pageToUpdate?.app,
      id: pageToUpdate?.id,
      name: pageToUpdate?.name,
      urlPattern: pageToUpdate?.urlPattern,
    }

    return (
      <Form<UpdatePageSchema>
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
