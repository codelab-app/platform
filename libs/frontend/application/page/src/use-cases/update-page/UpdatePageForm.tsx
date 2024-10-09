import type { IFormController } from '@codelab/frontend/abstract/types'
import type { IUpdatePageData } from '@codelab/shared/abstract/core'
import type { Maybe } from '@codelab/shared/abstract/types'

import { UiKey } from '@codelab/frontend/abstract/types'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import {
  Form,
  FormController,
} from '@codelab/frontend-presentation-components-form'
import { DisplayIf } from '@codelab/frontend-presentation-view/components/conditionalView'
import { observer } from 'mobx-react-lite'
import { AutoFields } from 'uniforms-antd'

import { usePageService } from '../../services'
import { type UpdatePageSchema, updatePageSchema } from './update-page.schema'
import { useUpdatePageForm } from './update-page.state'

export const UpdatePageForm = observer<IFormController>(
  ({ onSubmitSuccess, showFormControl = true, submitRef }) => {
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
