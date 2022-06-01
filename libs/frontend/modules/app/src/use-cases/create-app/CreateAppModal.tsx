import type {
  APP_SERVICE,
  USER_SERVICE,
  WithServices,
} from '@codelab/frontend/abstract/core'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import { ICreateAppDTO } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { createAppSchema } from './createAppSchema'

export const CreateAppModal = observer<
  WithServices<APP_SERVICE | USER_SERVICE>
>(({ appService, userService }) => {
  const onSubmit = (data: ICreateAppDTO) => {
    return appService.create([data])
  }

  const closeModal = () => appService.createModal.close()

  return (
    <ModalForm.Modal
      okText="Create App"
      onCancel={closeModal}
      visible={appService.createModal.isOpen}
    >
      <ModalForm.Form
        model={{
          auth0Id: userService.user?.auth0Id,
        }}
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
