import type {
  IPageService,
  IUpdatePageDTO,
} from '@codelab/frontend/abstract/core'
import { SlugField } from '@codelab/frontend/domain/type'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import { AutoField, AutoFields } from 'uniforms-antd'
import { updatePageSchema } from './updatePageSchema'

export const UpdatePageModal = observer<{ pageService: IPageService }>(
  ({ pageService }) => {
    const closeModal = () => pageService.updateModal.close()
    const page = pageService.updateModal.page
    const [name, setName] = useState('')

    useEffect(() => {
      // set the initial value of the page's name once available
      page && setName(page.name)
    }, [page])

    if (!page) {
      return null
    }

    const model = {
      name: page.name,
      appId: page.app.id || undefined,
      slug: page.slug,
      getServerSideProps: page.getServerSideProps,
    }

    const onSubmit = (input: IUpdatePageDTO) => pageService.update(page, input)

    const onSubmitError = createNotificationHandler({
      title: 'Error while updating page',
    })

    return (
      <ModalForm.Modal
        okText="Update Page"
        onCancel={closeModal}
        open={pageService.updateModal.isOpen}
      >
        <ModalForm.Form<Omit<IUpdatePageDTO, 'pageContainerElementId'>>
          model={model}
          onChange={(key, value) => {
            key === 'name' && setName(value)
          }}
          onSubmit={onSubmit}
          onSubmitError={onSubmitError}
          onSubmitSuccess={closeModal}
          schema={updatePageSchema}
        >
          <AutoField name="name" />
          <SlugField name="slug" srcString={name} />
          <AutoFields omitFields={['appId', 'name', 'slug']} />
        </ModalForm.Form>
      </ModalForm.Modal>
    )
  },
)
