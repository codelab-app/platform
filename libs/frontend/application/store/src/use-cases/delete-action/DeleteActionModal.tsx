'use client'

import { UiKey } from '@codelab/frontend/abstract/types'
import { ModalForm } from '@codelab/frontend-presentation-components-form'
import { emptyJsonSchema } from '@codelab/frontend-presentation-components-form/schema'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'
import { AutoFields } from 'uniforms-antd'

import { useActionService } from '../../services'

export const DeleteActionModal = observer(({ id }: { id: string }) => {
  const router = useRouter()
  const actionService = useActionService()
  const action = actionService.getOneFromCache({ id })
  const closeModal = () => actionService.deletePopover.close(router)

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
      open={true}
      title="Delete Confirmation"
      uiKey={UiKey.ActionModalDelete}
    >
      <ModalForm.Form
        errorMessage="Error while deleting action"
        model={{}}
        onSubmit={onSubmit}
        onSubmitSuccess={closeModal}
        schema={emptyJsonSchema}
      >
        <h4>Are you sure you want to delete actions "{action?.name}"?</h4>
        <AutoFields />
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})
