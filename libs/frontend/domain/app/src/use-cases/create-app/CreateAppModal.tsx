import type {
  IAppService,
  ICreateAppDTO,
  IUserService,
} from '@codelab/frontend/abstract/core'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { v4 } from 'uuid'
import { createAppSchema } from './createAppSchema'

export const CreateAppModal = observer<{
  appService: IAppService
  userService: IUserService
}>(({ appService, userService }) => {
  const onSubmit = (appDTO: ICreateAppDTO) => {
    return appService.add({ ...appDTO, id: v4() })
  }

  const closeModal = () => appService.createModal.close()

  const model = {
    id: v4(),
    owner: {
      auth0Id: userService.user?.auth0Id,
    },
  }

  return (
    <ModalForm.Modal
      okText="Create App"
      onCancel={closeModal}
      open={appService.createModal.isOpen}
    >
      <ModalForm.Form
        model={model}
        onSubmit={onSubmit}
        onSubmitError={createNotificationHandler({
          title: 'Error while creating app',
        })}
        onSubmitSuccess={closeModal}
        schema={createAppSchema}
      >
        <AutoFields omitFields={['storeId']} />
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})
