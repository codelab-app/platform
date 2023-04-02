import type { IUpdatePageData } from '@codelab/frontend/abstract/core'
import { useStore } from '@codelab/frontend/presenter/container'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import type { UpdatePageSchema } from './update-page.schema'
import { updatePageSchema } from './update-page.schema'

export const UpdatePageModal = observer(() => {
  const { pageService } = useStore()
  const pageToUpdate = pageService.updateModal.page
  const onSubmit = (pageDTO: IUpdatePageData) => pageService.update(pageDTO)
  const closeModal = () => pageService.updateModal.close()

  const model = {
    app: pageToUpdate?.app,
    id: pageToUpdate?.id,
    name: pageToUpdate?.name,
    url: pageToUpdate?.url,
  }

  return (
    <ModalForm.Modal
      okText="Update Page"
      onCancel={closeModal}
      open={pageService.updateModal.isOpen}
    >
      <ModalForm.Form<UpdatePageSchema>
        model={model}
        onSubmit={onSubmit}
        onSubmitError={createNotificationHandler({
          title: 'Error while updating page',
        })}
        onSubmitSuccess={closeModal}
        schema={updatePageSchema}
      >
        <AutoFields omitFields={['appId']} />
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})
