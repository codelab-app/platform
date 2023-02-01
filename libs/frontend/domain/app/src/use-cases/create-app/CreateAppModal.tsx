import type {
  IAppService,
  ICreateAppDTO,
  IUserService,
} from '@codelab/frontend/abstract/core'
import { SlugField } from '@codelab/frontend/domain/type'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import { AutoField, AutoFields } from 'uniforms-antd'
import { createAppSchema } from './createAppSchema'

export const CreateAppModal = observer<{
  appService: IAppService
  userService: IUserService
}>(({ appService, userService }) => {
  const [name, setName] = useState('')

  const onSubmit = (data: ICreateAppDTO) => {
    return appService.create([data])
  }

  const closeModal = () => appService.createModal.close()

  const model = {
    auth0Id: userService.user?.auth0Id,
  }

  return (
    <ModalForm.Modal
      okText="Create App"
      onCancel={closeModal}
      open={appService.createModal.isOpen}
    >
      <ModalForm.Form
        model={model}
        onChange={(key, value) => {
          key === 'name' && setName(value)
        }}
        onSubmit={onSubmit}
        onSubmitError={createNotificationHandler({
          title: 'Error while creating app',
        })}
        onSubmitSuccess={closeModal}
        schema={createAppSchema}
      >
        <AutoField name="name" />
        <SlugField name="slug" srcString={name} />
        <AutoFields omitFields={['storeId', 'name', 'slug']} />
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})
