import type { ICreateComponentData } from '@codelab/frontend/abstract/core'
import { useStore } from '@codelab/frontend/presentation/container'
import { ModalForm } from '@codelab/frontend/presentation/view'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'
import { AutoFields } from 'uniforms-antd'
import { v4 } from 'uuid'
import { createComponentSchema } from './create-component.schema'

const KEY_GENERATOR = `function run(props) {
    // props are of type component api
    return props.id
}`

export const CreateComponentModal = observer(() => {
  const { componentService, userService } = useStore()

  const onSubmit = (componentData: ICreateComponentData) => {
    return componentService.create(componentData)
  }

  const closeModal = () => componentService.createModal.close()

  const model = {
    id: v4(),
    keyGenerator: KEY_GENERATOR,
    owner: { auth0Id: userService.user.auth0Id },
  }

  return (
    <ModalForm.Modal
      okText="Create Component"
      onCancel={closeModal}
      open={componentService.createModal.isOpen}
      title={<span css={tw`font-semibold`}>Create component</span>}
    >
      <ModalForm.Form<ICreateComponentData>
        model={model}
        onSubmit={onSubmit}
        onSubmitError={createNotificationHandler({
          title: 'Error while creating component',
        })}
        onSubmitSuccess={closeModal}
        schema={createComponentSchema}
      >
        <AutoFields
          omitFields={['childrenContainerElement', 'keyGenerator', 'api']}
        />
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})
