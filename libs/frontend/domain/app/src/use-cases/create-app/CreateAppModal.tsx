import type {
  IAppService,
  ICreateAppDTO,
  IUserService,
} from '@codelab/frontend/abstract/core'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import { AutoFields } from 'uniforms-antd'
import slugify from 'voca/slugify'
import { createAppSchema } from './createAppSchema'

export const CreateAppModal = observer<{
  appService: IAppService
  userService: IUserService
}>(({ appService, userService }) => {
  const [model, setModel] = useState<Partial<ICreateAppDTO>>({
    auth0Id: userService.user?.auth0Id,
  })

  const onSubmit = (data: ICreateAppDTO) => {
    return appService.create([data])
  }

  const closeModal = () => appService.createModal.close()

  return (
    <ModalForm.Modal
      okText="Create App"
      onCancel={closeModal}
      open={appService.createModal.isOpen}
    >
      <ModalForm.Form
        model={model}
        onChange={(k, v) => {
          setModel({
            ...model,
            slug: k === 'name' ? slugify(v) : model.slug,
            [k]: v,
          })
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
