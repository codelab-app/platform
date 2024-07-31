import { MODEL_ACTION, PageType } from '@codelab/frontend/abstract/types'
import { useResourceQuery } from '@codelab/frontend/presentation/container'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend-presentation-components-form'
import { emptyJsonSchema } from '@codelab/frontend-presentation-components-form/schema'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { useResourceService } from '../../services'
import { useDeleteResourceModal } from './delete-resource.state'

export const DeleteResourceModal = observer(() => {
  const resourceService = useResourceService()
  const router = useRouter()
  const resourceId = useResourceQuery()
  const deleteResourceModal = useDeleteResourceModal()
  const resource = deleteResourceModal.data

  const onSubmitSuccess = () => {
    deleteResourceModal.close()

    if (resourceId === resource?.id) {
      void router.push(PageType.Resources)
    }
  }

  const closeModal = () => deleteResourceModal.close()

  const onSubmit = async () => {
    if (!resource) {
      return Promise.reject()
    }

    await resourceService.remove([resource])

    closeModal()

    return Promise.resolve()
  }

  const onSubmitError = createFormErrorNotificationHandler({
    title: 'Error while deleting resource',
  })

  return (
    <ModalForm.Modal
      okText="Delete Resource"
      onCancel={onSubmitSuccess}
      open={deleteResourceModal.isOpen}
      title="Delete Confirmation"
    >
      <ModalForm.Form
        model={{}}
        onSubmit={onSubmit}
        onSubmitError={onSubmitError}
        onSubmitSuccess={onSubmitSuccess}
        schema={emptyJsonSchema}
        uiKey={MODEL_ACTION.DeleteResource.key}
      >
        <h4>Are you sure you want to delete resource {resource?.name}"</h4>
        <AutoFields />
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})
