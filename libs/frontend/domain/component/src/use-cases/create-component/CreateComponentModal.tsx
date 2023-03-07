import { ROOT_ELEMENT_NAME } from '@codelab/frontend/abstract/core'
import { InterfaceType } from '@codelab/frontend/domain/type'
import { useStore } from '@codelab/frontend/presenter/container'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'
import { AutoFields } from 'uniforms-antd'
import { v4 } from 'uuid'
import type { CreateComponentSchema } from './create-component.schema'
import { createComponentSchema } from './create-component.schema'

export const CreateComponentModal = observer(() => {
  const {
    componentService,
    typeService,
    userService,
    elementService,
    propService,
  } = useStore()

  const user = userService.user

  const handleSubmit = (componentData: CreateComponentSchema) => {
    if (!user) {
      return Promise.reject()
    }

    const props = propService.add({ id: v4() })

    const rootElement = elementService.add({
      id: v4(),
      name: ROOT_ELEMENT_NAME,
      props,
    })

    const api = typeService.addInterface({
      id: v4(),
      kind: ITypeKind.InterfaceType,
      name: InterfaceType.createName(`${componentData.name}`),
      owner: user,
    })

    return componentService.create({
      ...componentData,
      api,
      rootElement,
    })
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
