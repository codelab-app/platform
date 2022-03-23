import { useUser } from '@auth0/nextjs-auth0'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { AppService, WithAppService } from '../../store'
import { CreateAppInput, createAppSchema } from './createAppSchema'

export const CreateAppModal = observer<WithAppService>(({ appService }) => {
  const { user } = useUser()

  const onSubmitError = createNotificationHandler({
    title: 'Error while creating app',
  })

  const onSubmit = (input: CreateAppInput) =>
    appService.createApp({ ...input }, user?.sub)

  const closeModal = () => appService.createModal.close()

  return (
    <ModalForm.Modal
      okText="Create App"
      onCancel={closeModal}
      visible={appService.createModal.isOpen}
    >
      <ModalForm.Form
        model={{}}
        onSubmit={onSubmit}
        onSubmitError={onSubmitError}
        onSubmitSuccess={closeModal}
        schema={createAppSchema}
      >
        <AutoFields />
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})
