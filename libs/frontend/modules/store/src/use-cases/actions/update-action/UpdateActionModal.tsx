import {
  ACTION_SERVICE,
  RESOURCE_SERVICE,
  WithServices,
} from '@codelab/frontend/abstract/core'
import { SelectAction, SelectResource } from '@codelab/frontend/modules/type'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { DisplayIfField, ModalForm } from '@codelab/frontend/view/components'
import {
  IActionKind,
  IUpdateActionDTO,
  ResourceType,
} from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { Context } from 'uniforms'
import { AutoField, AutoFields, ListField, ListItemField } from 'uniforms-antd'
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
    storeId: updateAction?.storeId,
    runOnInit: updateAction?.runOnInit,
    name: updateAction?.name,
    type: updateAction?.type,
    id: updateAction?.id,

    actionsIds:
      updateAction?.type === IActionKind.PipelineAction
        ? updateAction.actionsSorted.map((a) => a.id)
        : undefined,

    config:
      updateAction?.type === IActionKind.ResourceAction
        ? updateAction.config?.values
        : undefined,
    resourceId:
      updateAction?.type === IActionKind.ResourceAction
        ? updateAction.resource?.id
        : undefined,
    successActionId:
      updateAction?.type === IActionKind.ResourceAction
        ? updateAction.successAction?.id
        : undefined,
    errorActionId:
      updateAction?.type === IActionKind.ResourceAction
        ? updateAction.errorAction.id
        : undefined,

    code:
      updateAction?.type === IActionKind.CustomAction
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

        {/** Custom Action */}
        <DisplayIfField<IUpdateActionDTO>
          condition={(c) => c.model.type === IActionKind.CustomAction}
        >
          <AutoField label="Action code" name="code" />
        </DisplayIfField>

        {/** Resource Action */}
        <DisplayIfField<IUpdateActionDTO>
          condition={(c) => c.model.type === IActionKind.ResourceAction}
        >
          <SelectResource name="resourceId" resourceService={resourceService} />

          <SelectAction
            actionService={actionService}
            name="successActionId"
            storeId={updateAction?.storeId as string}
          />

          <SelectAction
            actionService={actionService}
            name="errorActionId"
            storeId={updateAction?.storeId as string}
          />

          {/** GraphQL Config Form */}
          <DisplayIfField<IUpdateActionDTO>
            condition={(c) => getResourceType(c) === ResourceType.GraphQL}
          >
            <AutoField name="config.query" />
            <AutoField name="config.variables" />
            <AutoField name="config.headers" />
          </DisplayIfField>

          {/** Rest Config Form */}
          <DisplayIfField<IUpdateActionDTO>
            condition={(c) => getResourceType(c) === ResourceType.Rest}
          >
            <AutoField name="config.method" />
            <AutoField name="config.body" />
            <AutoField name="config.queryParams" />
            <AutoField name="config.headers" />
          </DisplayIfField>
        </DisplayIfField>

        {/** Pipeline Action */}
        <DisplayIfField<IUpdateActionDTO>
          condition={(c) => c.model.type === IActionKind.PipelineAction}
        >
          <ListField label="Actions" name="actionsIds">
            <ListItemField name="$">
              <SelectAction
                actionService={actionService}
                name=""
                storeId={updateAction?.storeId as string}
              />
            </ListItemField>
          </ListField>
        </DisplayIfField>
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})
