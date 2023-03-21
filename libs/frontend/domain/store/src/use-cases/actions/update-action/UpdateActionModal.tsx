import type { IUpdateActionData } from '@codelab/frontend/abstract/core'
import { SelectAction, SelectResource } from '@codelab/frontend/domain/type'
import { useStore } from '@codelab/frontend/presenter/container'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { DisplayIfField, ModalForm } from '@codelab/frontend/view/components'
import { IActionKind, IResourceType } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import type { Context } from 'uniforms'
import { AutoField, AutoFields } from 'uniforms-antd'
import { updateActionSchema } from './update-action.schema'

export const UpdateActionModal = observer(() => {
  const { actionService, resourceService } = useStore()
  const closeModal = () => actionService.updateModal.close()
  const updateAction = actionService.updateModal.action

  const onSubmit = (actionDTO: IUpdateActionData) => {
    return actionService.update(actionDTO)
  }

  const onSubmitError = createNotificationHandler({
    title: 'Error while updating action',
  })

  const baseModel = {
    id: updateAction?.id,
    name: updateAction?.name,
    storeId: updateAction?.store.current.id,
    type: updateAction?.type,
  }

  const model =
    updateAction?.type === IActionKind.ApiAction
      ? {
          config: {
            data: updateAction.config.current.values,
            id: updateAction.config.id,
          },
          ...baseModel,
          errorActionId: updateAction.errorAction?.id,
          resourceId: updateAction.resource.id,
          successActionId: updateAction.successAction?.id,
        }
      : {
          ...baseModel,
          code: updateAction?.code,
        }

  const getResourceType = (context: Context<IUpdateActionData>) =>
    context.model.resourceId
      ? resourceService.resource(context.model.resourceId)?.type
      : null

  const getResourceApiUrl = (context: Context<IUpdateActionData>) =>
    context.model.resourceId
      ? resourceService
          .resource(context.model.resourceId)
          ?.config.current.get('url')
      : null

  return (
    <ModalForm.Modal
      okText="Update Action"
      onCancel={closeModal}
      open={actionService.updateModal.isOpen}
    >
      <ModalForm.Form<IUpdateActionData>
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
        <DisplayIfField<IUpdateActionData>
          condition={(context) => context.model.type === IActionKind.CodeAction}
        >
          <AutoField label="Action code" name="code" />
        </DisplayIfField>

        {/** Api Action */}
        <DisplayIfField<IUpdateActionData>
          condition={(context) => context.model.type === IActionKind.ApiAction}
        >
          <SelectResource name="resourceId" resourceService={resourceService} />
          <AutoField component={SelectAction} name="successActionId" />
          <AutoField component={SelectAction} name="errorActionId" />

          {/** GraphQL Config Form */}
          <DisplayIfField<IUpdateActionData>
            condition={(context) =>
              getResourceType(context) === IResourceType.GraphQL
            }
          >
            <AutoField getUrl={getResourceApiUrl} name="config.data.query" />
            <AutoField name="config.data.variables" />
            <AutoField name="config.data.headers" />
          </DisplayIfField>

          {/** Rest Config Form */}
          <DisplayIfField<IUpdateActionData>
            condition={(context) =>
              getResourceType(context) === IResourceType.Rest
            }
          >
            <AutoField name="config.data.urlSegment" />
            <AutoField name="config.data.method" />
            <AutoField name="config.data.body" />
            <AutoField name="config.data.queryParams" />
            <AutoField name="config.data.headers" />
            <AutoField name="config.data.responseType" />
          </DisplayIfField>
        </DisplayIfField>
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})
