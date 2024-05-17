import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import { useStore } from '@codelab/frontend/application/shared/store'
import { ModalForm } from '@codelab/frontend/presentation/view'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import type { ICreateComponentData } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { v4 } from 'uuid'
import { createComponentSchema } from './create-component.schema'

export const CreateComponentModal = observer(() => {
  const { componentService, userService } = useStore()

  const onSubmit = (componentData: ICreateComponentData) => {
    return componentService.create(componentData)
  }

  const closeModal = () => componentService.createModal.close()

  const model = {
    id: v4(),
    owner: { auth0Id: userService.user.auth0Id },
  }

  return (
    <ModalForm.Modal
      okText="Create Component"
      onCancel={closeModal}
      open={componentService.createModal.isOpen}
      title={<span className="font-semibold">Create component</span>}
    >
      <ModalForm.Form<Omit<ICreateComponentData, 'rootElement'>>
        model={model}
        onSubmit={onSubmit}
        onSubmitError={createFormErrorNotificationHandler({
          title: 'Error while creating component',
        })}
        onSubmitSuccess={closeModal}
        schema={createComponentSchema}
        uiKey={MODEL_ACTION.CreateComponent.key}
      >
        <AutoFields omitFields={['api']} />
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})
