import {
  RESOURCE_SERVICE,
  USER_SERVICE,
  WithServices,
} from '@codelab/frontend/abstract/core'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { DisplayIfField, ModalForm } from '@codelab/frontend/view/components'
import {
  ICreateResourceDTO,
  IResourceType,
} from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoField, AutoFields } from 'uniforms-antd'
import { createResourceSchema } from './createResourceSchema'

export const CreateResourceModal = observer<
  WithServices<RESOURCE_SERVICE | USER_SERVICE>
>(({ resourceService, userService }) => {
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
          condition={(c) => c.model.type === IResourceType.GraphQL}
        >
          <AutoField name="config.url" />
          <AutoField name="config.headers" />
          <AutoField name="config.cookies" />
        </DisplayIfField>

        {/**
         *  Rest Resource Config Form
         */}
        <DisplayIfField<ICreateResourceDTO>
          condition={(c) => c.model.type === IResourceType.Rest}
        >
          <AutoField name="config.url" />
          <AutoField name="config.headers" />
          <AutoField name="config.cookies" />
        </DisplayIfField>
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})
