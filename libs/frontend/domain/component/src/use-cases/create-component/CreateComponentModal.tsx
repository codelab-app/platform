import {
  IComponentService,
  ICreateComponentDTO,
  IUserService,
} from '@codelab/frontend/abstract/core'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'
import { AutoFields } from 'uniforms-antd'
import { createComponentSchema } from './createComponentSchema'

export const CreateComponentModal = observer<{
  componentService: IComponentService
  userService: IUserService
}>(({ componentService, userService }) => {
  const user = userService.user

  const handleSubmit = (data: ICreateComponentDTO) => {
    return componentService.create([data])
  }

  const closeModal = () => componentService.createModal.close()

  const onSubmitError = createNotificationHandler({
    title: 'Error while creating component',
  })

  return (
    <ModalForm.Modal
      okText="Create Component"
      onCancel={closeModal}
      title={<span css={tw`font-semibold`}>Create component</span>}
      visible={componentService.createModal.isOpen}
    >
      <ModalForm.Form<Omit<ICreateComponentDTO, 'rootElementId'>>
        model={{
          auth0Id: user?.auth0Id,
        }}
        onSubmit={handleSubmit}
        onSubmitError={onSubmitError}
        onSubmitSuccess={closeModal}
        schema={createComponentSchema}
      >
        <AutoFields />
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})
