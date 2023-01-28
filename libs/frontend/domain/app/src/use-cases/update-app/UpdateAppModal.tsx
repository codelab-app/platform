import type {
  IAppService,
  IUpdateAppDTO,
  IUserService,
} from '@codelab/frontend/abstract/core'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import type { Nullable } from '@codelab/shared/abstract/types'
import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import { AutoFields } from 'uniforms-antd'
import slugify from 'voca/slugify'
import { updateAppSchema } from './updateAppSchema'

export const UpdateAppModal = observer<{
  appService: IAppService
  userService: IUserService
}>(({ appService, userService }) => {
  const app = appService.updateModal.app

  const [model, setModel] =
    useState<
      Nullable<Partial<IUpdateAppDTO & { ownerId: string; storeId: string }>>
    >(null)

  useEffect(() => {
    if (app) {
      setModel({
        name: app.name,
        slug: app.slug,
        ownerId: userService.user?.auth0Id,
        storeId: app.store.id,
      })
    }
  }, [app])

  if (!app || !model) {
    return null
  }

  const onSubmit = (input: IUpdateAppDTO) => appService.update(app, input)
  const closeModal = () => appService.updateModal.close()

  if (!userService.user) {
    throw new Error('Missing user for update app')
  }

  return (
    <ModalForm.Modal
      okText="Update App"
      onCancel={closeModal}
      open={appService.updateModal.isOpen}
    >
      <ModalForm.Form<IUpdateAppDTO>
        model={model}
        onChange={(key, value) => {
          setModel({
            ...model,
            slug: key === 'name' ? slugify(value) : model.slug,
            [key]: value,
          })
        }}
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
