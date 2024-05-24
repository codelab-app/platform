import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import { useStore } from '@codelab/frontend/application/shared/store'
import { useCui } from '@codelab/frontend/presentation/codelab-ui'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import {
  emptyJsonSchema,
  ModalForm,
} from '@codelab/frontend-presentation-view/components'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'

export const DeleteRedirectModal = observer(() => {
  const { redirectService } = useStore()
  const redirect = redirectService.deleteModal.metadata?.current
  const { popover } = useCui()

  const onSubmitSuccess = () => {
    redirectService.deleteModal.close()
    popover.close()
    redirectService.updateForm.close()
  }

  const closeModal = () => redirectService.deleteModal.close()

  const onSubmit = () => {
    if (!redirect) {
      return Promise.reject()
    }

    void redirectService.delete([redirect])

    closeModal()

    return Promise.resolve()
  }

  const onSubmitError = createFormErrorNotificationHandler({
    title: 'Error while deleting redirect',
  })

  return (
    <ModalForm.Modal
      okText="Delete Redirect"
      onCancel={onSubmitSuccess}
      open={redirectService.deleteModal.isOpen}
      title="Delete Confirmation"
    >
      <ModalForm.Form
        model={{}}
        onSubmit={onSubmit}
        onSubmitError={onSubmitError}
        onSubmitSuccess={onSubmitSuccess}
        schema={emptyJsonSchema}
        uiKey={MODEL_ACTION.DeleteRedirect.key}
      >
        <h4>Are you sure you want to delete redirect"</h4>
        <AutoFields />
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})
