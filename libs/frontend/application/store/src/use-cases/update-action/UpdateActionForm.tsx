import type { IUpdateActionData } from '@codelab/shared-abstract-core'

import { type IFormController, UiKey } from '@codelab/frontend-abstract-types'
import { ResourceFetchConfigField } from '@codelab/frontend-application-resource/components'
import { useDomainStore } from '@codelab/frontend-infra-mobx-context'
import {
  Form,
  FormController,
} from '@codelab/frontend-presentation-components-form'
import { DisplayIf } from '@codelab/frontend-presentation-view/components/conditionalView'
import { IActionKind } from '@codelab/shared-abstract-core'
import { observer } from 'mobx-react-lite'
import { useMemo } from 'react'
import { AutoField, AutoFields } from 'uniforms-antd'

import { useActionService } from '../../services'
import { useActionSchema } from '../action-hooks'
import { updateActionSchema } from './update-action.schema'

interface UpdateActionFormProps extends IFormController {
  actionId: string
}

export const UpdateActionForm = observer<UpdateActionFormProps>(
  ({ actionId, onSubmitSuccess, showFormControl = true, submitRef }) => {
    const actionService = useActionService()
    const { actionDomainService, resourceDomainService } = useDomainStore()

    const actionToUpdate = actionDomainService.actions.get(actionId)
    const resources = resourceDomainService.getSelectOption()
    const actions = actionDomainService.getSelectActionOptions(
      actionToUpdate!.store.current,
    )

    const actionSchema = useActionSchema(
      useMemo(
        () => updateActionSchema({ actions, resources }),
        [actions, resources],
      ),
    )

    const baseModel = {
      id: actionToUpdate?.id,
      name: actionToUpdate?.name,
      store: actionToUpdate?.store.current,
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
            errorAction: actionToUpdate.errorAction ?? undefined,
            resource: actionToUpdate.resource,
            successAction: actionToUpdate.successAction ?? undefined,
          }
        : {
            ...baseModel,
            code: actionToUpdate?.code,
          }

    return (
      <Form<IUpdateActionData>
        errorMessage="Error while updating action"
        model={model as unknown as IUpdateActionData}
        onSubmit={actionService.update}
        onSubmitSuccess={onSubmitSuccess}
        schema={actionSchema}
        submitRef={submitRef}
        uiKey={UiKey.ActionFormUpdate}
      >
        <AutoFields fields={['name']} />

        <DisplayIf condition={actionToUpdate?.type === IActionKind.CodeAction}>
          <AutoField name="code" />
        </DisplayIf>

        <DisplayIf condition={actionToUpdate?.type === IActionKind.ApiAction}>
          <AutoField name="resource" />
          <AutoField name="successAction" />
          <AutoField name="errorAction" />
          <ResourceFetchConfigField />
        </DisplayIf>

        <DisplayIf condition={showFormControl}>
          <FormController submitLabel="Update Action" />
        </DisplayIf>
      </Form>
    )
  },
)
