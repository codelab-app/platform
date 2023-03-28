import { useStore } from '@codelab/frontend/presenter/container'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'
import { AutoFields } from 'uniforms-antd'
import { v4 } from 'uuid'
import type { CreateComponentSchema } from './create-component.schema'
import { createComponentSchema } from './create-component.schema'

export const CreateComponentModal = observer(() => {
  const { componentService, userService } = useStore()
  const user = userService.user

  const onSubmit = (componentData: CreateComponentSchema) => {
    if (!user) {
      return Promise.reject()
    }

    const rootElement = { id: v4() }

    return componentService.create({
      ...componentData,
      api: { id: v4() },
      childrenContainerElement: rootElement,
      rootElement,
    })
  }

  const closeModal = () => componentService.createModal.close()

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
        onSubmit={onSubmit}
        onSubmitError={createNotificationHandler({
          title: 'Error while creating component',
        })}
        onSubmitSuccess={closeModal}
        schema={createComponentSchema}
      >
        <AutoFields omitFields={['childrenContainerElement', 'api']} />
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})
