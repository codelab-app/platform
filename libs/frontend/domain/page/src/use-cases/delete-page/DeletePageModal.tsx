import type { IPageService } from '@codelab/frontend/abstract/core'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { emptyJsonSchema, ModalForm } from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'

export const DeletePageModal = observer<{ pageService: IPageService }>(
  ({ pageService }) => {
    const page = pageService.deleteModal.page
    const isOpen = pageService.deleteModal.isOpen
    const closeModal = () => pageService.deleteModal.close()

    const onSubmit = () => {
      if (!page) {
        return Promise.reject()
      }

      return pageService.delete(page)
    }

    const onSubmitError = createNotificationHandler({
      title: 'Error while deleting page',
    })

    return (
      <ModalForm.Modal okText="Delete Page" onCancel={closeModal} open={isOpen}>
        <ModalForm.Form
          model={{}}
          onSubmit={onSubmit}
          onSubmitError={onSubmitError}
          onSubmitSuccess={closeModal}
          schema={emptyJsonSchema}
        >
          <h4>Are you sure you want to delete page "{page?.name}"?</h4>
          <AutoFields />
        </ModalForm.Form>
      </ModalForm.Modal>
    )
  },
)
