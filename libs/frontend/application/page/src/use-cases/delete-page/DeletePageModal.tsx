import { useStore } from '@codelab/frontend/application/shared/store'
import { emptyJsonSchema, ModalForm } from '@codelab/frontend/presentation/view'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
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

    return pageService.delete([page])
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
        onSubmitError={createFormErrorNotificationHandler({
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