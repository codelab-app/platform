import { UiKey } from '@codelab/frontend/abstract/types'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend-presentation-components-form'
import { emptyJsonSchema } from '@codelab/frontend-presentation-components-form/schema'
import { observer } from 'mobx-react-lite'
import { AutoFields } from 'uniforms-antd'

import { useActionService } from '../../services'
import { useDeleteActionModal } from './delete-action.state'

export const DeleteActionModal = observer(() => {
  const actionService = useActionService()
  const deleteActionModal = useDeleteActionModal()
  const action = deleteActionModal.data
  const closeModal = () => deleteActionModal.close()

  const onSubmit = () => {
    if (!action) {
      return Promise.reject()
    }

    return actionService.removeMany([action])
  }

  return (
    <ModalForm.Modal
      okText="Delete Action"
      onCancel={closeModal}
      open={deleteActionModal.isOpen}
      title="Delete Confirmation"
      uiKey={UiKey.ActionModalDelete}
    >
      <ModalForm.Form
        model={{}}
        onSubmit={onSubmit}
        onSubmitError={createFormErrorNotificationHandler({
          title: 'Error while deleting action',
        })}
        onSubmitSuccess={closeModal}
        schema={emptyJsonSchema}
      >
        <h4>Are you sure you want to delete actions "{action?.name}"?</h4>
        <AutoFields />
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})
