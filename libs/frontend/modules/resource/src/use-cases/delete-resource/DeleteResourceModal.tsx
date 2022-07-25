import { PageType } from '@codelab/frontend/abstract/types'
import { useCurrentResourceId } from '@codelab/frontend/presenter/container'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { emptyJsonSchema, ModalForm } from '@codelab/frontend/view/components'
import { IResourceService } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'
import React from 'react'
import { AutoFields } from 'uniforms-antd'

export const DeleteResourceModal = observer<{
  resourceService: IResourceService
}>(({ resourceService }) => {
  const router = useRouter()
  const resourceId = useCurrentResourceId()
  const resource = resourceService.deleteModal.resource

  const onSubmitSuccess = () => {
    resourceService.deleteModal.close()

    if (resourceId === resource?.id) {
      router.push({ pathname: PageType.Resource, query: {} })
    }
  }

  const onSubmit = () => {
    if (!resource) {
      throw new Error('Resource to delete not found')
    }

    return resourceService.deleteResource(resource?.id)
  }

  const onSubmitError = createNotificationHandler({
    title: 'Error while deleting resource',
  })

  return (
    <ModalForm.Modal
      className="delete-resources-modal"
      okText="Delete Resource"
      onCancel={onSubmitSuccess}
      title="Delete Confirmation"
      visible={resourceService.deleteModal.isOpen}
    >
      <ModalForm.Form
        model={{}}
        onSubmit={onSubmit}
        onSubmitError={onSubmitError}
        onSubmitSuccess={onSubmitSuccess}
        schema={emptyJsonSchema}
      >
        <h4>Are you sure you want to delete resource {resource?.name}"</h4>
        <AutoFields />
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})
