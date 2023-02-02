import type {
  ICreatePageDTO,
  IPageService,
} from '@codelab/frontend/abstract/core'
import { DEFAULT_GET_SERVER_SIDE_PROPS } from '@codelab/frontend/abstract/core'
import { SlugField } from '@codelab/frontend/domain/type'
import { useCurrentAppId } from '@codelab/frontend/presenter/container'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import { AutoField, AutoFields } from 'uniforms-antd'
import { createPageSchema } from './createPageSchema'

export const CreatePageModal = observer<{ pageService: IPageService }>(
  ({ pageService }) => {
    const currentAppId = useCurrentAppId()
    const isOpen = pageService.createModal.isOpen
    const [name, setName] = useState('')

    const model = {
      appId: currentAppId,
      getServerSideProps: DEFAULT_GET_SERVER_SIDE_PROPS,
    }

    const onSubmit = (data: ICreatePageDTO) => pageService.create([data])

    const onSubmitError = createNotificationHandler({
      title: 'Error while creating page',
    })

    const closeModal = () => pageService.createModal.close()

    return (
      <ModalForm.Modal okText="Create Page" onCancel={closeModal} open={isOpen}>
        <ModalForm.Form<Omit<ICreatePageDTO, 'pageContainerElementId'>>
          model={model}
          onChange={(key, value) => {
            key === 'name' && setName(value)
          }}
          onSubmit={onSubmit}
          onSubmitError={onSubmitError}
          onSubmitSuccess={closeModal}
          schema={createPageSchema}
        >
          <AutoField name="name" />
          <SlugField name="slug" srcString={name} />
          <AutoFields omitFields={['appId', 'name', 'slug']} />
        </ModalForm.Form>
      </ModalForm.Modal>
    )
  },
)
