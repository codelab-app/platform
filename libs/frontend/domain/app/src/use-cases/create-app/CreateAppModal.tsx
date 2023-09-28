import type { ICreateAppData } from '@codelab/frontend/abstract/core'
import { useStore } from '@codelab/frontend/presentation/container'
import { ModalForm } from '@codelab/frontend/presentation/view'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { v4 } from 'uuid'
import { createAppSchema } from './create-app.schema'

export const CreateAppModal = observer(() => {
  const { appService, atomService, userService } = useStore()

  const onSubmit = async (appDTO: ICreateAppData) => {
    await atomService.getDefaultElementRenderType()
    await appService.create(appDTO)

    closeModal()

    return Promise.resolve()
  }

  const closeModal = () => appService.createModal.close()

  const model = {
    id: v4(),
    owner: {
      auth0Id: userService.user.auth0Id,
    },
  }

  return (
    <ModalForm.Modal
      okText="Create App"
      onCancel={closeModal}
      open={appService.createModal.isOpen}
    >
      <ModalForm.Form<ICreateAppData>
        model={model}
        onSubmit={onSubmit}
        onSubmitError={createFormErrorNotificationHandler({
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
