import {
  IActionService,
  IResourceService,
  IUpdateActionDTO,
} from '@codelab/frontend/abstract/core'
import { SelectAction, SelectResource } from '@codelab/frontend/domain/type'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { DisplayIfField, ModalForm } from '@codelab/frontend/view/components'
import { IActionKind, IResourceType } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { Context } from 'uniforms'
import { AutoField, AutoFields } from 'uniforms-antd'
import { updateActionSchema } from './updateActionSchema'

export const UpdateActionModal = observer<{
  actionService: IActionService
  resourceService: IResourceService
}>(({ actionService, resourceService }) => {
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
    storeId: updateAction?.storeId,
    name: updateAction?.name,
    type: updateAction?.type,
    id: updateAction?.id,

    config:
      updateAction?.type === IActionKind.ApiAction
        ? updateAction.config.values
        : undefined,
    resourceId:
      updateAction?.type === IActionKind.ApiAction
        ? updateAction.resource.id
        : undefined,
    successActionId:
      updateAction?.type === IActionKind.ApiAction
        ? updateAction.successAction?.id
        : undefined,
    errorActionId:
      updateAction?.type === IActionKind.ApiAction
        ? updateAction.errorAction?.id
        : undefined,

    code:
      updateAction?.type === IActionKind.CodeAction
        ? updateAction.code
        : undefined,
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
        <AutoFields
          omitFields={[
            'code',
            'resourceId',
            'config',
            'successActionId',
            'errorActionId',
            'actionsIds',
          ]}
        />

        {/** Code Action */}
        <DisplayIfField<IUpdateActionDTO>
          condition={(c) => c.model.type === IActionKind.CodeAction}
        >
          <AutoField label="Action code" name="code" />
        </DisplayIfField>

        {/** Api Action */}
        <DisplayIfField<IUpdateActionDTO>
          condition={(c) => c.model.type === IActionKind.ApiAction}
        >
          <SelectResource name="resourceId" resourceService={resourceService} />
          <AutoField component={SelectAction} name="successActionId" />
          <AutoField component={SelectAction} name="errorActionId" />

          {/** GraphQL Config Form */}
          <DisplayIfField<IUpdateActionDTO>
            condition={(c) => getResourceType(c) === IResourceType.GraphQL}
          >
            <AutoField name="config.query" />
            <AutoField name="config.variables" />
            <AutoField name="config.headers" />
          </DisplayIfField>

          {/** Rest Config Form */}
          <DisplayIfField<IUpdateActionDTO>
            condition={(c) => getResourceType(c) === IResourceType.Rest}
          >
            <AutoField name="config.urlSegment" />
            <AutoField name="config.method" />
            <AutoField name="config.body" />
            <AutoField name="config.queryParams" />
            <AutoField name="config.headers" />
            <AutoField name="config.responseType" />
          </DisplayIfField>
        </DisplayIfField>
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})
