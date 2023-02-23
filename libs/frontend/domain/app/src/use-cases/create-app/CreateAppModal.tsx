import type {
  IAppService,
  ICreateAppDTO,
  IUserService,
} from '@codelab/frontend/abstract/core'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import { AutoField, AutoFields } from 'uniforms-antd'
import { v4 } from 'uuid'
import { createAppSchema } from './createAppSchema'

export const CreateAppModal = observer<{
  appService: IAppService
  userService: IUserService
}>(({ appService, userService }) => {
  const onSubmit = (data: ICreateAppDTO) => {
    return appService.add({ ...data, id: v4() })
  }

  const closeModal = () => appService.createModal.close()

  const model = {
    ownerId: userService.user?.id,
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
