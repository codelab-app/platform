import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import { useStore } from '@codelab/frontend/infra/mobx'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import { ResourceFetchConfigField } from '@codelab/frontend-application-resource/components'
import {
  SelectAction,
  SelectResource,
} from '@codelab/frontend-application-type/interface-form'
import { ModalForm } from '@codelab/frontend-presentation-components-form'
import type { IUpdateActionData } from '@codelab/shared/abstract/core'
import { IActionKind } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoField, AutoFields } from 'uniforms-antd'
import { updateActionSchema } from './update-action.schema'

export const UpdateActionModal = observer(() => {
  const { actionService, resourceService } = useStore()
  const closeModal = () => actionService.updateModal.close()
  const actionToUpdate = actionService.updateModal.action

  const onSubmit = (actionDTO: IUpdateActionData) => {
    return actionService.update(actionDTO)
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
          resourceId: actionToUpdate.resource.id,
          successActionId: actionToUpdate.successAction?.id,
        }
      : {
          ...baseModel,
          code: actionToUpdate?.code,
        }

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
        uiKey={MODEL_ACTION.UpdateAction.key}
      >
        <AutoFields fields={['name']} />

        {actionToUpdate?.type === IActionKind.CodeAction && (
          <AutoField name="code" />
        )}

        {actionToUpdate?.type === IActionKind.ApiAction && (
          <>
            <SelectResource name="resourceId" />
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

            <ResourceFetchConfigField />
          </>
        )}
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})
