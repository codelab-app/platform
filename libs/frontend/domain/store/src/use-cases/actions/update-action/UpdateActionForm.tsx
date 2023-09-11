import type { IUpdateActionData } from '@codelab/frontend/abstract/core'
import type { SubmitController } from '@codelab/frontend/abstract/types'
import { SelectAction, SelectResource } from '@codelab/frontend/domain/type'
import { useStore } from '@codelab/frontend/presentation/container'
import {
  DisplayIf,
  DisplayIfField,
  Form,
  FormController,
} from '@codelab/frontend/presentation/view'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { IActionKind, IResourceType } from '@codelab/shared/abstract/core'
import type { Maybe } from '@codelab/shared/abstract/types'
import { observer } from 'mobx-react-lite'
import React from 'react'
import type { Context } from 'uniforms'
import { AutoField, AutoFields } from 'uniforms-antd'
import { useActionSchema } from '../hooks'
import { updateActionSchema } from './update-action.schema'

interface UpdateActionFormProps {
  showFormControl?: boolean
  submitRef?: React.MutableRefObject<Maybe<SubmitController>>
  onSubmitSuccess?(): void
}

export const UpdateActionForm = observer(
  ({
    onSubmitSuccess,
    showFormControl = true,
    submitRef,
  }: UpdateActionFormProps) => {
    const { actionService, resourceService } = useStore()
    const actionSchema = useActionSchema(updateActionSchema)
    const closeForm = () => actionService.updateForm.close()
    const actionToUpdate = actionService.updateForm.action

    const onSubmit = (actionDTO: IUpdateActionData) => {
      const promise = actionService.update(actionDTO)
      onSubmitSuccess?.()

      return promise
    }

    const onSubmitError = createNotificationHandler({
      title: 'Error while updating action',
    })

    const baseModel = {
      id: actionToUpdate?.id,
      name: actionToUpdate?.name,
      storeId: actionToUpdate?.store.current.id,
      type: actionToUpdate?.type,
    }

    const model =
      actionToUpdate?.type === IActionKind.ApiAction
        ? {
            config: {
              data: actionToUpdate.config.current.values,
              id: actionToUpdate.config.id,
            },
            ...baseModel,
            errorActionId: actionToUpdate.errorAction?.id,
            resourceId: actionToUpdate.resource.id,
            successActionId: actionToUpdate.successAction?.id,
          }
        : {
            ...baseModel,
            code: actionToUpdate?.code,
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
      <Form<IUpdateActionData>
        model={model}
        onSubmit={onSubmit}
        onSubmitError={onSubmitError}
        onSubmitSuccess={closeForm}
        schema={actionSchema}
        submitRef={submitRef}
      >
        <AutoFields fields={['name']} />

        {actionToUpdate?.type === IActionKind.CodeAction && (
          <AutoField name="code" />
        )}

        {actionToUpdate?.type === IActionKind.ApiAction && (
          <>
            <SelectResource
              name="resourceId"
              resourceService={resourceService}
            />
            <AutoField
              component={SelectAction}
              name="successActionId"
              updatedAction={{ id: actionToUpdate.id }}
            />
            <AutoField
              component={SelectAction}
              name="errorActionId"
              updatedAction={{ id: actionToUpdate.id }}
            />

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
          </>
        )}

        <DisplayIf condition={showFormControl}>
          <FormController onCancel={closeForm} submitLabel="Update Action" />
        </DisplayIf>
      </Form>
    )
  },
)
