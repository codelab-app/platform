import type {
  IComponentService,
  ICreateComponentData,
  IUserService,
} from '@codelab/frontend/abstract/core'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'
import { AutoFields } from 'uniforms-antd'
import { v4 } from 'uuid'
import type { CreateComponentSchema } from './createComponentSchema'
import { createComponentSchema } from './createComponentSchema'

export const CreateComponentModal = observer<{
  componentService: IComponentService
  userService: IUserService
}>(({ componentService, userService }) => {
  const user = userService.user

  const handleSubmit = (componentData: ICreateComponentData) => {
    return componentService.create(componentData)
  }

  const closeModal = () => componentService.createModal.close()

  const onSubmitError = createNotificationHandler({
    title: 'Error while creating component',
  })

  return (
    <ModalForm.Modal
      okText="Create Component"
      onCancel={closeModal}
      open={componentService.createModal.isOpen}
      title={<span css={tw`font-semibold`}>Create component</span>}
    >
      <ModalForm.Form<CreateComponentSchema>
        model={{
          childrenContainerElement: {
            id: v4(),
          },
          id: v4(),
          owner: { auth0Id: user?.auth0Id },
        }}
        onSubmit={handleSubmit}
        onSubmitError={onSubmitError}
        onSubmitSuccess={closeModal}
        schema={createComponentSchema}
      >
        <AutoFields omitFields={['childrenContainerElement', 'api']} />
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})
