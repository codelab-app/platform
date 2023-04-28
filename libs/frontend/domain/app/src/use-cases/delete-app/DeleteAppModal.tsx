import { useStore } from '@codelab/frontend/presentation/container'
import { emptyJsonSchema, ModalForm } from '@codelab/frontend/presentation/view'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { observer } from 'mobx-react-lite'
import React from 'react'

export const DeleteAppModal = observer(() => {
  const { appService, domainService } = useStore()
  const app = appService.deleteModal.app

  const onSubmitError = createNotificationHandler({
    title: 'Error while deleting app',
  })

  const closeModal = () => appService.deleteModal.close()

  const onSubmit = () => {
    if (!app) {
      return Promise.reject()
    }

    app.domains.forEach(async (domain) => {
      const maybeDomain = domainService.domains.get(domain.id)

      if (maybeDomain) {
        await domainService.delete(maybeDomain)
      }
    })

    return appService.delete(app)
  }

  return (
    <ModalForm.Modal
      okText="Delete App"
      onCancel={closeModal}
      open={appService.deleteModal.isOpen}
    >
      <ModalForm.Form
        model={{}}
        onSubmit={onSubmit}
        onSubmitError={onSubmitError}
        onSubmitSuccess={closeModal}
        schema={emptyJsonSchema}
      >
        <h4>Are you sure you want to delete app "{app?.name}"?</h4>
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})
