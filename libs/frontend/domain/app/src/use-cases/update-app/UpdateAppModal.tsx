import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import {
  IAppService,
  IUpdateAppDTO,
  IUserService,
} from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { updateAppSchema } from './updateAppSchema'

export const UpdateAppModal = observer<{
  appService: IAppService
  userService: IUserService
}>(({ appService, userService }) => {
  const app = appService.updateModal.app

  if (!app) {
    return null
  }

  const onSubmit = (input: IUpdateAppDTO) => appService.update(app, input)
  const closeModal = () => appService.updateModal.close()

  if (!userService?.user) {
    throw new Error('Missing user for update app')
  }

  const model = {
    name: app?.name,
    slug: app.slug,
    ownerId: userService?.user.auth0Id,
    storeId: app?.store?.id,
  }

  return (
    <ModalForm.Modal
      okText="Update App"
      onCancel={closeModal}
      visible={appService.updateModal.isOpen}
    >
      <ModalForm.Form<IUpdateAppDTO>
        model={model}
        onSubmit={onSubmit}
        onSubmitError={createNotificationHandler({
          title: 'Error while updating app',
        })}
        onSubmitSuccess={closeModal}
        schema={updateAppSchema}
      >
        <AutoFields omitFields={['storeId']} />
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})
