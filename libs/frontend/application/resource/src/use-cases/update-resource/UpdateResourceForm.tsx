'use client'

import type { IUpdateResourceData } from '@codelab/shared/abstract/core'

import { UiKey } from '@codelab/frontend/abstract/types'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import {
  Form,
  FormController,
} from '@codelab/frontend-presentation-components-form'
import { observer } from 'mobx-react-lite'
import { AutoFields } from 'uniforms-antd'

import { useResourceService } from '../../services'
import { updateResourceSchema } from './update-resource.schema'
import { useUpdateResourceForm } from './update-resource.state'

export const UpdateResourceForm = observer(() => {
  const resourceService = useResourceService()
  const updateResourceForm = useUpdateResourceForm()
  const resource = updateResourceForm.data

  const model = {
    config: resource?.config.values,
    id: resource?.id,
    name: resource?.name,
    type: resource?.type,
  }

  const onSubmit = (resourceDTO: IUpdateResourceData) => {
    void resourceService.update(resourceDTO)

    return Promise.resolve()
  }

  return (
    <Form<IUpdateResourceData>
      model={model}
      onSubmit={onSubmit}
      onSubmitError={createFormErrorNotificationHandler({
        title: 'Error while updating resource',
      })}
      schema={updateResourceSchema}
      uiKey={UiKey.ResourceFormUpdate}
    >
      <AutoFields />
      <FormController submitLabel="Update Resource" />
    </Form>
  )
})
