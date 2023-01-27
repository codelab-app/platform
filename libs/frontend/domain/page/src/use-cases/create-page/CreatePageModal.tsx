import type {
  ICreatePageDTO,
  IPageService,
} from '@codelab/frontend/abstract/core'
import { DEFAULT_GET_SERVER_SIDE_PROPS } from '@codelab/frontend/abstract/core'
import { useCurrentAppId } from '@codelab/frontend/presenter/container'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import { AutoFields } from 'uniforms-antd'
import slugify from 'voca/slugify'
import { createPageSchema } from './createPageSchema'

export const CreatePageModal = observer<{ pageService: IPageService }>(
  ({ pageService }) => {
    const currentAppId = useCurrentAppId()
    const isOpen = pageService.createModal.isOpen

    const [model, setModel] = useState<Partial<ICreatePageDTO>>({
      appId: currentAppId,
      getServerSideProps: DEFAULT_GET_SERVER_SIDE_PROPS,
    })

    const onSubmit = (data: ICreatePageDTO) => pageService.create([data])

    const onSubmitError = createNotificationHandler({
      title: 'Error while creating page',
    })

    const closeModal = () => pageService.createModal.close()

    return (
      <ModalForm.Modal okText="Create Page" onCancel={closeModal} open={isOpen}>
        <ModalForm.Form<Omit<ICreatePageDTO, 'pageContainerElementId'>>
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
          schema={createPageSchema}
        >
          <AutoFields omitFields={['appId']} />
        </ModalForm.Form>
      </ModalForm.Modal>
    )
  },
)
