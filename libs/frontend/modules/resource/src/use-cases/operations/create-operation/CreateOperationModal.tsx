import {
  OPERATION_SERVICE,
  RESOURCE_SERVICE,
  WithServices,
} from '@codelab/frontend/abstract/core'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { DisplayIfField, ModalForm } from '@codelab/frontend/view/components'
import {
  ICreateOperationDTO,
  ResourceType,
} from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoField, AutoFields } from 'uniforms-antd'
import { useCurrentResource } from '../../../hooks'
import { createOperationSchema } from './createOperationSchema'

export const CreateOperationModal = observer<
  WithServices<OPERATION_SERVICE | RESOURCE_SERVICE>
>(({ operationService, resourceService }) => {
  const { resource } = useCurrentResource(resourceService)
  const closeModal = () => operationService.createModal.close()

  const onSubmit = (input: ICreateOperationDTO) =>
    operationService.create(input)

  const onSubmitError = createNotificationHandler({
    title: 'Error while creating operation',
  })

  return (
    <ModalForm.Modal
      okText="Create Operation"
      onCancel={closeModal}
      visible={operationService.createModal.isOpen}
    >
      <ModalForm.Form
        model={{
          resource: resource?.id,
        }}
        onSubmit={onSubmit}
        onSubmitError={onSubmitError}
        onSubmitSuccess={closeModal}
        schema={createOperationSchema}
      >
        <AutoFields omitFields={['config']} />

        {/**
         *
         *  GraphQL Operation Config Form
         *
         */}
        <DisplayIfField<ICreateOperationDTO>
          condition={(c) => resource?.type === ResourceType.GraphQL}
        >
          <AutoField name="config.query" />
          <AutoField name="config.variables" />
        </DisplayIfField>

        {/**
         *
         *  Rest Operation Config Form
         *
         */}
        <DisplayIfField<ICreateOperationDTO>
          condition={(c) => resource?.type === ResourceType.Rest}
        >
          <AutoField name="config.method" />
          <AutoField name="config.body" />
          <AutoField name="config.queryParams" />
        </DisplayIfField>
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})
