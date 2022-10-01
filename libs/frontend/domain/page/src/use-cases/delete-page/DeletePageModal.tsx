import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { emptyJsonSchema, ModalForm } from '@codelab/frontend/view/components'
import { IPageService } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'

export const DeletePageModal = observer<{ pageService: IPageService }>(
  ({ pageService }) => {
    const deletingPage = pageService.deleteModal.page
    const isOpen = pageService.deleteModal.isOpen
    const closeModal = () => pageService.deleteModal.close()

    if (!deletingPage) {
      return null
    }

    const onSubmit = () => pageService.delete(deletingPage.id)

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
  },
)
