import {
  ACTION_SERVICE,
  RESOURCE_SERVICE,
  WithServices,
} from '@codelab/frontend/abstract/core'
import { SelectResource } from '@codelab/frontend/modules/type'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { DisplayIfField, ModalForm } from '@codelab/frontend/view/components'
import { IUpdateActionDTO, ResourceType } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { Context } from 'uniforms'
import { AutoField, AutoFields } from 'uniforms-antd'
import { updateActionSchema } from './updateActionSchema'

export const UpdateActionModal = observer<
  WithServices<ACTION_SERVICE | RESOURCE_SERVICE>
>(({ actionService, resourceService }) => {
  const closeModal = () => actionService.updateModal.close()
  const updateAction = actionService.updateModal.action

  const onSubmit = (data: IUpdateActionDTO) => {
    if (!updateAction) {
      throw new Error('Updated action is not set')
    }

    return actionService.update(updateAction, data)
  }

  const onSubmitError = createNotificationHandler({
    title: 'Error while updating action',
  })

  const model = {
    storeId: actionService.updateModal.action?.storeId,
    runOnInit: actionService.updateModal.action?.runOnInit,
    config: actionService.updateModal.action?.config?.values,
    resourceId: actionService.updateModal.action?.resource?.id,
    name: actionService.updateModal.action?.name,
    body: actionService.updateModal.action?.body || '',
  }

  const getResourceType = (c: Context<IUpdateActionDTO>) =>
    c.model.resourceId
      ? resourceService.resource(c.model.resourceId)?.type
      : null

  return (
    <ModalForm.Modal
      okText="Update Action"
      onCancel={closeModal}
      visible={actionService.updateModal.isOpen}
    >
      <ModalForm.Form<IUpdateActionDTO>
        model={model}
        onSubmit={onSubmit}
        onSubmitError={onSubmitError}
        onSubmitSuccess={closeModal}
        schema={updateActionSchema}
      >
        <AutoFields omitFields={['storeId', 'resourceId', 'config']} />

        <AutoField
          component={observer((props) => (
            <SelectResource
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...(props as any)}
              resourceService={resourceService}
            />
          ))}
          name="resourceId"
        />

        {/**
         *
         *  GraphQL Operation Config Form
         *
         */}
        <DisplayIfField<IUpdateActionDTO>
          condition={(c) => getResourceType(c) === ResourceType.GraphQL}
        >
          <AutoField name="config.query" />
          <AutoField name="config.variables" />
        </DisplayIfField>

        {/**
         *
         *  Rest Operation Config Form
         *
         */}
        <DisplayIfField<IUpdateActionDTO>
          condition={(c) => getResourceType(c) === ResourceType.Rest}
        >
          <AutoField name="config.method" />
          <AutoField name="config.body" />
          <AutoField name="config.queryParams" />
        </DisplayIfField>
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})
