import {
  MODEL_ACTION,
  type SubmitController,
} from '@codelab/frontend/abstract/types'
import { ResourceFetchConfigField } from '@codelab/frontend/application/resource'
import { useStore } from '@codelab/frontend/application/shared/store'
import {
  SelectAction,
  SelectResource,
} from '@codelab/frontend/application/type'
import {
  DisplayIf,
  Form,
  FormController,
} from '@codelab/frontend-presentation-view/components'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import type { IUpdateActionData } from '@codelab/shared/abstract/core'
import { IActionKind } from '@codelab/shared/abstract/core'
import type { Maybe } from '@codelab/shared/abstract/types'
import { observer } from 'mobx-react-lite'
import React from 'react'
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
    const { actionService } = useStore()
    const actionSchema = useActionSchema(updateActionSchema)
    const closeForm = () => actionService.updateForm.close()
    const actionToUpdate = actionService.updateForm.action

    const onSubmit = (actionDTO: IUpdateActionData) => {
      const promise = actionService.update(actionDTO)

      onSubmitSuccess?.()

      return promise
    }

    const onSubmitError = createFormErrorNotificationHandler({
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
              data: actionToUpdate.config.values,
              id: actionToUpdate.config.id,
            },
            ...baseModel,
            errorActionId: actionToUpdate.errorAction?.id,
            resource: actionToUpdate.resource,
            successActionId: actionToUpdate.successAction?.id,
          }
        : {
            ...baseModel,
            code: actionToUpdate?.code,
          }

    return (
      <Form<IUpdateActionData>
        model={model}
        onSubmit={onSubmit}
        onSubmitError={onSubmitError}
        onSubmitSuccess={closeForm}
        schema={actionSchema}
        submitRef={submitRef}
        uiKey={MODEL_ACTION.UpdateAction.key}
      >
        <AutoFields fields={['name']} />

        <DisplayIf condition={actionToUpdate?.type === IActionKind.CodeAction}>
          <AutoField name="code" />
        </DisplayIf>

        <DisplayIf condition={actionToUpdate?.type === IActionKind.ApiAction}>
          <SelectResource name="resource.id" />
          <AutoField
            component={SelectAction}
            name="successActionId"
            updatedAction={actionToUpdate}
          />
          <AutoField
            component={SelectAction}
            name="errorActionId"
            updatedAction={actionToUpdate}
          />
          <ResourceFetchConfigField />
        </DisplayIf>

        <DisplayIf condition={showFormControl}>
          <FormController onCancel={closeForm} submitLabel="Update Action" />
        </DisplayIf>
      </Form>
    )
  },
)
