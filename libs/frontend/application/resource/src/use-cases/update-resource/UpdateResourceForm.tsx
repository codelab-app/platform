import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import { useStore } from '@codelab/frontend/application/shared/store'
import { Form, FormController } from '@codelab/frontend/presentation/view'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import type { IUpdateResourceData } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { updateResourceSchema } from './update-resource.schema'

export const UpdateResourceForm = observer(() => {
  const { resourceService } = useStore()
  const resource = resourceService.updateForm.resource

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
      uiKey={MODEL_ACTION.UpdateResource.key}
    >
      <AutoFields />
      <FormController submitLabel="Update Resource" />
    </Form>
  )
})
