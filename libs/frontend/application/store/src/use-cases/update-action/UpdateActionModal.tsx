import { UiKey } from '@codelab/frontend/abstract/types'
import {
  SelectAction,
  SelectResource,
} from '@codelab/frontend/presentation/components/interface-form'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import { ResourceFetchConfigField } from '@codelab/frontend-application-resource/components'
import { ModalForm } from '@codelab/frontend-presentation-components-form'
import type { IUpdateActionData } from '@codelab/shared/abstract/core'
import { IActionKind } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import { AutoField, AutoFields } from 'uniforms-antd'
import { useActionService } from '../../services'
import { updateActionSchema } from './update-action.schema'
import { useUpdateActionModal } from './update-action.state'

export const UpdateActionModal = observer(() => {
  const actionService = useActionService()
  const updateActionModal = useUpdateActionModal()
  const closeModal = () => updateActionModal.close()
  const actionToUpdate = updateActionModal.data

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
      open={updateActionModal.isOpen}
      uiKey={UiKey.UpdateActionModal}
    >
      <ModalForm.Form<IUpdateActionData>
        model={model}
        onSubmit={onSubmit}
        onSubmitError={onSubmitError}
        onSubmitSuccess={closeModal}
        schema={updateActionSchema}
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
