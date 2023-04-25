import type { ICreatePageData } from '@codelab/frontend/abstract/core'
import {
  useCurrentAppId,
  useStore,
} from '@codelab/frontend/presentation/container'
import { ModalForm } from '@codelab/frontend/presentation/view'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { v4 } from 'uuid'
import { createPageSchema } from './create-page.schema'

export const CreatePageModal = observer(() => {
  const { pageService, userService } = useStore()
  const currentAppId = useCurrentAppId()

  const model = {
    app: { id: currentAppId },
    id: v4(),
    // required for store api
    owner: {
      auth0Id: userService.auth0Id,
    },
  }

  const onSubmit = (data: ICreatePageData) => pageService.create(data)
  const closeModal = () => pageService.createModal.close()

  return (
    <ModalForm.Modal
      okText="Create Page"
      onCancel={closeModal}
      open={pageService.createModal.isOpen}
    >
      <ModalForm.Form<ICreatePageData>
        model={model}
        onSubmit={onSubmit}
        onSubmitError={createNotificationHandler({
          title: 'Error while creating page',
        })}
        onSubmitSuccess={closeModal}
        schema={createPageSchema}
      >
        <AutoFields />
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})
