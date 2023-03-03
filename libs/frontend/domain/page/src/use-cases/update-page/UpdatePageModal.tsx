import type {
  IPageService,
  IUpdatePageData,
} from '@codelab/frontend/abstract/core'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import type { UpdatePageSchema } from './updatePageSchema'
import { updatePageSchema } from './updatePageSchema'

export const UpdatePageModal = observer<{ pageService: IPageService }>(
  ({ pageService }) => {
    const closeModal = () => pageService.updateModal.close()
    const page = pageService.updateModal.page
    const onSubmit = (pageDTO: IUpdatePageData) => pageService.update(pageDTO)

    const onSubmitError = createNotificationHandler({
      title: 'Error while updating page',
    })

    const model = {
      appId: page?.app.id,
      getServerSideProps: page?.getServerSideProps,
      name: page?.name,
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
          onSubmitError={onSubmitError}
          onSubmitSuccess={closeModal}
          schema={updatePageSchema}
        >
          <AutoFields omitFields={['appId']} />
        </ModalForm.Form>
      </ModalForm.Modal>
    )
  },
)
