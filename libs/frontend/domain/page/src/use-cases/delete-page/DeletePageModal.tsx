import { useStore } from '@codelab/frontend/presentation/container'
import { emptyJsonSchema, ModalForm } from '@codelab/frontend/presentation/view'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { getSnapshot } from 'mobx-keystone'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'

export const DeletePageModal = observer(() => {
  const { pageService } = useStore()
  const page = pageService.deleteModal.page
  const closeModal = () => pageService.deleteModal.close()

  const onSubmit = () => {
    if (!page) {
      return Promise.reject()
    }

    return pageService.delete(page)
  }

  return (
    <ModalForm.Modal
      okText="Delete Page"
      onCancel={closeModal}
      open={pageService.deleteModal.isOpen}
    >
      <ModalForm.Form
        model={{}}
        onSubmit={onSubmit}
        onSubmitError={createNotificationHandler({
          title: 'Error while deleting page',
        })}
        onSubmitSuccess={closeModal}
        schema={emptyJsonSchema}
      >
        <h4>Are you sure you want to delete page "{page?.name}"?</h4>
        <AutoFields />
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})
