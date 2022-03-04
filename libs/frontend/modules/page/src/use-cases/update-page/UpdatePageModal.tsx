import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { PageStore } from '../../store'
import { UpdatePageInput, updatePageSchema } from './updatePageSchema'

export interface UpdatePageModalProps {
  pages: PageStore
}

export const UpdatePageModal = observer<UpdatePageModalProps>(({ pages }) => {
  const isOpen = pages.updateModal.isOpen
  const closeModal = () => pages.updateModal.close()
  const updatingPage = pages.updateModal.page

  if (!updatingPage) {
    return null
  }

  const onSubmit = (input: UpdatePageInput) => {
    const promise = updatingPage.update(input)
    closeModal()

    return promise
  }

  const onSubmitError = createNotificationHandler({
    title: 'Error while updating page',
  })

  const model = {
    name: updatingPage.name,
    appId: updatingPage.appId || undefined,
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
