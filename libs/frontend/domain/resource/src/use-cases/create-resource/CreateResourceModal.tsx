import {
  ICreateResourceDTO,
  IResourceService,
  IUserService,
} from '@codelab/frontend/abstract/core'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { DisplayIfField, ModalForm } from '@codelab/frontend/view/components'
import { IResourceType } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoField, AutoFields } from 'uniforms-antd'
import { createResourceSchema } from './createResourceSchema'

export const CreateResourceModal = observer<{
  resourceService: IResourceService
  userService: IUserService
}>(({ resourceService, userService }) => {
  const closeModal = () => resourceService.createModal.close()
  const onSubmit = (data: ICreateResourceDTO) => resourceService.create([data])

  const onSubmitError = createNotificationHandler({
    title: 'Error while creating resource',
  })

  const type = resourceService.createModal.type

  return (
    <ModalForm.Modal
      okText="Create Resource"
      onCancel={closeModal}
      visible={resourceService.createModal.isOpen}
    >
      <ModalForm.Form
        model={{ auth0Id: userService.auth0Id, type }}
        onSubmit={onSubmit}
        onSubmitError={onSubmitError}
        onSubmitSuccess={closeModal}
        schema={createResourceSchema}
      >
        <AutoFields omitFields={['config']} />

        {/**
         *  GraphQL Resource Config Form
         */}
        <DisplayIfField<ICreateResourceDTO>
          condition={(context) => context.model.type === IResourceType.GraphQL}
        >
          <AutoField name="config.url" />
          <AutoField name="config.headers" />
        </DisplayIfField>

        {/**
         *  Rest Resource Config Form
         */}
        <DisplayIfField<ICreateResourceDTO>
          condition={(context) => context.model.type === IResourceType.Rest}
        >
          <AutoField name="config.url" />
          <AutoField name="config.headers" />
        </DisplayIfField>
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})
