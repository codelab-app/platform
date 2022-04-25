import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { DisplayIfField, ModalForm } from '@codelab/frontend/view/components'
import {
  IUpdateOperationDTO,
  ResourceType,
} from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoField, AutoFields } from 'uniforms-antd'
import { useCurrentResource } from '../../../hooks'
import { WithOperationService, WithResourceService } from '../../../store'
import { updateOperationSchema } from './updateOperationSchema'

export const UpdateOperationModal = observer<
  WithOperationService & WithResourceService
>(({ operationService, resourceService }) => {
  const closeModal = () => operationService.updateModal.close()
  const updateOperation = operationService.updateModal.operation
  const { resource } = useCurrentResource(resourceService)

  const onSubmit = (data: IUpdateOperationDTO) => {
    if (!updateOperation) {
      throw new Error('Updated operation is not set')
    }

    return operationService.update(updateOperation, data)
  }

  const onSubmitError = createNotificationHandler({
    title: 'Error while updating operation',
  })

  const model = {
    name: operationService.updateModal.operation?.name,
    config: operationService.updateModal.operation?.config,
    runOnInit: operationService.updateModal.operation?.runOnInit,
  }

  return (
    <ModalForm.Modal
      okText="Update Operation"
      onCancel={closeModal}
      visible={operationService.updateModal.isOpen}
    >
      <ModalForm.Form
        model={model}
        onSubmit={onSubmit}
        onSubmitError={onSubmitError}
        onSubmitSuccess={closeModal}
        schema={updateOperationSchema}
      >
        <AutoFields omitFields={['config']} />

        {/**
         *
         *  GraphQL Operation Config Form
         *
         */}
        <DisplayIfField<IUpdateOperationDTO>
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
        <DisplayIfField<IUpdateOperationDTO>
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
