import { IPageService, IUpdatePageDTO } from '@codelab/frontend/abstract/core'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { updatePageSchema } from './updatePageSchema'

export const UpdatePageModal = observer<{ pageService: IPageService }>(
  ({ pageService }) => {
    const closeModal = () => pageService.updateModal.close()
    const page = pageService.updateModal.page

    if (!page) {
      return null
    }

    const onSubmit = (input: IUpdatePageDTO) => pageService.update(page, input)

    const onSubmitError = createNotificationHandler({
      title: 'Error while updating page',
    })

    const model = {
      name: page.name,
      appId: page.app.id || undefined,
      slug: page.slug,
      getServerSideProps: page.getServerSideProps,
    }

    return (
      <ModalForm.Modal
        okText="Update Page"
        onCancel={closeModal}
        visible={pageService.updateModal.isOpen}
      >
        <ModalForm.Form<IUpdatePageDTO>
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
