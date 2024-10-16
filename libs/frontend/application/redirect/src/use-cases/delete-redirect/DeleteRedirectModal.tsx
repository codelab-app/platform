import { UiKey } from '@codelab/frontend/abstract/types'
import { useCui } from '@codelab/frontend/presentation/codelab-ui'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend-presentation-components-form'
import { emptyJsonSchema } from '@codelab/frontend-presentation-components-form/schema'
import { observer } from 'mobx-react-lite'
import { AutoFields } from 'uniforms-antd'

import { useRedirectService } from '../../services'
import { useUpdateRedirectForm } from '../update-redirect'
import { useDeleteRedirectModal } from './delete-redirect.state'

export const DeleteRedirectModal = observer(() => {
  const redirectService = useRedirectService()
  const deleteRedirectModal = useDeleteRedirectModal()
  const updateRedirectForm = useUpdateRedirectForm()
  const redirect = deleteRedirectModal.data
  const { popover } = useCui()

  const onSubmitSuccess = () => {
    deleteRedirectModal.close()
    popover.close()
    updateRedirectForm.close()
  }

  const closeModal = () => deleteRedirectModal.close()

  const onSubmit = () => {
    if (!redirect) {
      return Promise.reject()
    }

    void redirectService.removeMany([redirect])

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
      open={deleteRedirectModal.isOpen}
      title="Delete Confirmation"
      uiKey={UiKey.RedirectModalDelete}
    >
      <ModalForm.Form
        model={{}}
        onSubmit={onSubmit}
        onSubmitError={onSubmitError}
        onSubmitSuccess={onSubmitSuccess}
        schema={emptyJsonSchema}
      >
        <h4>Are you sure you want to delete redirect"</h4>
        <AutoFields />
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})
