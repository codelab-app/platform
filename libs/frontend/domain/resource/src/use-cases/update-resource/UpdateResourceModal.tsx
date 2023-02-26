import type {
  IResourceService,
  IUpdateResourceData,
} from '@codelab/frontend/abstract/core'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { DisplayIfField, ModalForm } from '@codelab/frontend/view/components'
import { IResourceType } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoField, AutoFields } from 'uniforms-antd'
import { updateResourceSchema } from './updateResourceSchema'

export const UpdateResourceModal = observer<{
  resourceService: IResourceService
}>(({ resourceService }) => {
  const updateResource = resourceService.updateModal.resource
  const closeModal = () => resourceService.updateModal.close()

  const onSubmit = async (resourceDTO: IUpdateResourceData) => {
    return resourceService.update(resourceDTO)
  }

  const onSubmitError = createNotificationHandler({
    title: 'Error while updating resource',
  })

  const model = {
    name: updateResource?.name,
    config: updateResource?.config.values,
    type: updateResource?.type,
  }

  return (
    <ModalForm.Modal
      okText="Update Resource"
      onCancel={closeModal}
      open={resourceService.updateModal.isOpen}
    >
      <ModalForm.Form
        model={model}
        onSubmit={onSubmit}
        onSubmitError={onSubmitError}
        onSubmitSuccess={closeModal}
        schema={updateResourceSchema}
      >
        <AutoFields omitFields={['config']} />

        {/**
         *
         *  GraphQL Resource Config Form
         *
         */}
        <DisplayIfField<IUpdateResourceData>
          condition={(context) => context.model.type === IResourceType.GraphQL}
        >
          <AutoField name="config.url" />
          <AutoField name="config.headers" />
        </DisplayIfField>

        {/**
         *
         *  Rest Resource Config Form
         *
         */}
        <DisplayIfField<IUpdateResourceData>
          condition={(context) => context.model.type === IResourceType.Rest}
        >
          <AutoField name="config.url" />
          <AutoField name="config.headers" />
        </DisplayIfField>
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})
