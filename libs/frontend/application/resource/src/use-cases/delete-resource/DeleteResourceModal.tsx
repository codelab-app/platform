import { MODEL_ACTION, PageType } from '@codelab/frontend/abstract/types'
import { useStore } from '@codelab/frontend/application/shared/store'
import { useResourceQuery } from '@codelab/frontend/presentation/container'
import { emptyJsonSchema, ModalForm } from '@codelab/frontend/presentation/view'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import {
  emptyJsonSchema,
  ModalForm,
} from '@codelab/frontend-presentation-view/components'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'
import React from 'react'
import { AutoFields } from 'uniforms-antd'

export const DeleteResourceModal = observer(() => {
  const { resourceService } = useStore()
  const router = useRouter()
  const resourceId = useResourceQuery()
  const resource = resourceService.deleteModal.resource

  const onSubmitSuccess = () => {
    resourceService.deleteModal.close()

    if (resourceId === resource?.id) {
      void router.push({ pathname: PageType.Resources, query: {} })
    }
  }

  const closeModal = () => resourceService.deleteModal.close()

  const onSubmit = () => {
    if (!resource) {
      return Promise.reject()
    }

    void resourceService.delete([resource])

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
      open={resourceService.deleteModal.isOpen}
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
