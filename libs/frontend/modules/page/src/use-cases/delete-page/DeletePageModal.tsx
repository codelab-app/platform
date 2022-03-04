import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { emptyJsonSchema, ModalForm } from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { PageStore } from '../../store'

export interface DeletePageModalProps {
  pages: PageStore
}

export const DeletePageModal = observer<DeletePageModalProps>(({ pages }) => {
  const deletingPage = pages.deleteModal.page
  const isOpen = pages.deleteModal.isOpen
  const closeModal = () => pages.deleteModal.close()

  if (!deletingPage) {
    return null
  }

  const onSubmit = () => {
    const promise = pages.delete(deletingPage.id)
    closeModal()

    return promise
  }

  const onSubmitError = createNotificationHandler({
    title: 'Error while deleting page',
  })

  return (
    <ModalForm.Modal
      okText="Delete Page"
      onCancel={closeModal}
      visible={isOpen}
    >
      <ModalForm.Form
        model={{}}
        onSubmit={onSubmit}
        onSubmitError={onSubmitError}
        onSubmitSuccess={closeModal}
        schema={emptyJsonSchema}
      >
        <h4>Are you sure you want to delete page "{deletingPage.name}"?</h4>
        <AutoFields />
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})
