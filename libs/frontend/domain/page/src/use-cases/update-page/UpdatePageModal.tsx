import type {
  IPageService,
  IUpdatePageDTO,
} from '@codelab/frontend/abstract/core'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import type { Nullable } from '@codelab/shared/abstract/types'
import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import { AutoFields } from 'uniforms-antd'
import slugify from 'voca/slugify'
import { updatePageSchema } from './updatePageSchema'

export const UpdatePageModal = observer<{ pageService: IPageService }>(
  ({ pageService }) => {
    const closeModal = () => pageService.updateModal.close()
    const page = pageService.updateModal.page
    const [model, setModel] = useState<Nullable<Partial<IUpdatePageDTO>>>(null)

    useEffect(() => {
      if (page) {
        setModel({
          name: page.name,
          appId: page.app.id || undefined,
          slug: page.slug,
          getServerSideProps: page.getServerSideProps,
        })
      }
    }, [page])

    if (!page || !model) {
      return null
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
          onChange={(k, v) => {
            setModel({
              ...model,
              slug: k === 'name' ? slugify(v) : model.slug,
              [k]: v,
            })
          }}
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
