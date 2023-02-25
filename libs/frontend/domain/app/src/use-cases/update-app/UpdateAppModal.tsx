import type {
  IAppService,
  IUpdateAppDTO,
  IUserService,
} from '@codelab/frontend/abstract/core'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { updateAppSchema } from './updateAppSchema'

export const UpdateAppModal = observer<{
  appService: IAppService
  userService: IUserService
}>(({ appService, userService }) => {
  const app = appService.updateModal.app

  const model = {
    id: app?.id,
    name: app?.name,
    ownerId: userService.user?.auth0Id,
    storeId: app?.store.id,
  }

  const onSubmit = (appDTO: IUpdateAppDTO) => appService.update(appDTO)
  const closeModal = () => appService.updateModal.close()

  return (
    <ModalForm.Modal
      okText="Update App"
      onCancel={closeModal}
      open={appService.updateModal.isOpen}
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
