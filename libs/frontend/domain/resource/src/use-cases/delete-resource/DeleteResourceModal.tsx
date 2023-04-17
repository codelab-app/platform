import { PageType } from '@codelab/frontend/abstract/types'
import {
  useCurrentResourceId,
  useStore,
} from '@codelab/frontend/presenter/container'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { emptyJsonSchema, ModalForm } from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'
import React from 'react'
import { AutoFields } from 'uniforms-antd'

export const DeleteResourceModal = observer(() => {
  const { resourceService } = useStore()
  const router = useRouter()
  const resourceId = useCurrentResourceId()
  const resource = resourceService.deleteModal.resource

  const onSubmitSuccess = () => {
    resourceService.deleteModal.close()

    if (resourceId === resource?.id) {
      void router.push({ pathname: PageType.Resources, query: {} })
    }
  }

  const onSubmit = () => {
    if (!resource) {
      return Promise.reject()
    }

    return resourceService.delete(resource)
  }

  const onSubmitError = createNotificationHandler({
    title: 'Error while deleting resource',
  })

  return (
    <ModalForm.Modal
      className="delete-resources-modal"
      okText="Delete Resource"
      onCancel={onSubmitSuccess}
      open={resourceService.deleteModal.isOpen}
      title="Delete Confirmation"
    >
      <ModalForm.Form
        model={{}}
        onSubmit={onSubmit}
        onSubmitError={onSubmitError}
        onSubmitSuccess={onSubmitSuccess}
        optimistic
        schema={emptyJsonSchema}
      >
        <h4>Are you sure you want to delete resource {resource?.name}"</h4>
        <AutoFields />
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})
