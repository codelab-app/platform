import type {
  ICreatePageData,
  IPageDTO,
  IPageService,
  IUserService,
} from '@codelab/frontend/abstract/core'
import { DEFAULT_GET_SERVER_SIDE_PROPS } from '@codelab/frontend/abstract/core'
import { useCurrentAppId } from '@codelab/frontend/presenter/container'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { v4 } from 'uuid'
import { createPageSchema } from './createPageSchema'

export const CreatePageModal = observer<{
  pageService: IPageService
  userService: IUserService
}>(({ pageService, userService }) => {
  const currentAppId = useCurrentAppId()
  const isOpen = pageService.createModal.isOpen

  const model = {
    id: v4(),
    app: { id: currentAppId },
    owner: {
      auth0Id: userService.auth0Id,
    },
    getServerSideProps: DEFAULT_GET_SERVER_SIDE_PROPS,
  }

  const onSubmit = (data: ICreatePageData) => pageService.create(data)

  const onSubmitError = createNotificationHandler({
    title: 'Error while creating page',
  })

  const closeModal = () => pageService.createModal.close()

  return (
    <ModalForm.Modal okText="Create Page" onCancel={closeModal} open={isOpen}>
      <ModalForm.Form<ICreatePageData>
        model={model}
        onSubmit={onSubmit}
        onSubmitError={onSubmitError}
        onSubmitSuccess={closeModal}
        schema={createPageSchema}
      >
        <AutoFields />
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})
