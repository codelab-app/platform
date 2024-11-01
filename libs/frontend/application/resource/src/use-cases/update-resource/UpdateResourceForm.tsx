'use client'

import type { IResourceModel } from '@codelab/frontend/abstract/domain'
import type { IFormController } from '@codelab/frontend/abstract/types'
import type { IUpdateResourceData } from '@codelab/shared/abstract/core'

import { UiKey } from '@codelab/frontend/abstract/types'
import {
  Form,
  FormController,
} from '@codelab/frontend-presentation-components-form'
import { DisplayIf } from '@codelab/frontend-presentation-view/components/conditionalView'
import { observer } from 'mobx-react-lite'
import { AutoFields } from 'uniforms-antd'

import { useResourceService } from '../../services'
import { updateResourceSchema } from './update-resource.schema'

interface UpdateResourceFormProps extends IFormController {
  resource: IResourceModel
}

export const UpdateResourceForm = observer<UpdateResourceFormProps>(
  ({ onSubmitSuccess, resource, showFormControl = false, submitRef }) => {
    const resourceService = useResourceService()

    const model = {
      config: resource.config.values,
      id: resource.id,
      name: resource.name,
      owner: resource.owner,
      type: resource.type,
    }

    const onSubmit = (resourceDTO: IUpdateResourceData) =>
      resourceService.update(resourceDTO)

    return (
      <Form<IUpdateResourceData>
        errorMessage="Error while updating resource"
        model={model}
        onSubmit={onSubmit}
        onSubmitSuccess={onSubmitSuccess}
        schema={updateResourceSchema}
        submitRef={submitRef}
        uiKey={UiKey.ResourceFormUpdate}
      >
        <AutoFields />

        <DisplayIf condition={showFormControl}>
          <FormController submitLabel="Update Resource" />
        </DisplayIf>
      </Form>
    )
  },
)
