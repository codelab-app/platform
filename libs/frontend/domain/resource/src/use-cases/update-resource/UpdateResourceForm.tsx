import type { IUpdateResourceData } from '@codelab/frontend/abstract/core'
import { useStore } from '@codelab/frontend/presentation/container'
import { Form, FormController } from '@codelab/frontend/presentation/view'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { updateResourceSchema } from './update-resource.schema'

export const UpdateResourceForm = observer(() => {
  const { resourceService } = useStore()
  const resource = resourceService.updateForm.resource

  const model = {
    config: resource?.config.current.values,
    id: resource?.id,
    name: resource?.name,
    owner: resource?.owner,
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
      onSubmitError={createNotificationHandler({
        title: 'Error while updating resource',
      })}
      schema={updateResourceSchema}
    >
      <AutoFields />
      <FormController
        onCancel={() => {
          /** */
        }}
        submitLabel="Update Resource"
      />
    </Form>
  )
})
