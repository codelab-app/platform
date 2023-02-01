import type {
  IAppService,
  IUpdateAppDTO,
  IUserService,
} from '@codelab/frontend/abstract/core'
import { SlugField } from '@codelab/frontend/domain/type'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import { AutoField, AutoFields } from 'uniforms-antd'
import { updateAppSchema } from './updateAppSchema'

export const UpdateAppModal = observer<{
  appService: IAppService
  userService: IUserService
}>(({ appService, userService }) => {
  const app = appService.updateModal.app
  const [name, setName] = useState('')

  useEffect(() => {
    // set the initial value of the app's name once available
    app && setName(app.name)
  }, [app])

  if (!app) {
    return null
  }

  const model = {
    name: app.name,
    slug: app.slug,
    ownerId: userService.user?.auth0Id,
    storeId: app.store.id,
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
          key === 'name' && setName(value)
        }}
        onSubmit={onSubmit}
        onSubmitError={createNotificationHandler({
          title: 'Error while updating app',
        })}
        onSubmitSuccess={closeModal}
        schema={updateAppSchema}
      >
        <AutoField name="name" />
        <SlugField name="slug" srcString={name} />
        <AutoFields omitFields={['storeId', 'name', 'slug']} />
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})
