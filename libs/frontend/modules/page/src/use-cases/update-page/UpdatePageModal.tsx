import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { PageService, WithPageService } from '../../store'
import { UpdatePageInput, updatePageSchema } from './updatePageSchema'

export const UpdatePageModal = observer<WithPageService>(({ pageService }) => {
  const isOpen = pageService.updateModal.isOpen
  const closeModal = () => pageService.updateModal.close()
  const pageToUpdate = pageService.updateModal.page

  if (!pageToUpdate) {
    return null
  }

  const onSubmit = (input: UpdatePageInput) =>
    pageService.update(pageToUpdate, input)

  const onSubmitError = createNotificationHandler({
    title: 'Error while updating page',
  })

  const model = {
    name: pageToUpdate.name,
    appId: pageToUpdate.appId || undefined,
  }

  return (
    <ModalForm.Modal
      okText="Update Page"
      onCancel={closeModal}
      visible={isOpen}
    >
      <ModalForm.Form<UpdatePageInput>
        model={model}
        onSubmit={onSubmit}
        onSubmitError={onSubmitError}
        onSubmitSuccess={closeModal}
        schema={updatePageSchema}
      >
        <AutoFields omitFields={['appId']} />
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})
