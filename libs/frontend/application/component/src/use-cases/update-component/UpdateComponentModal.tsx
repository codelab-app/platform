import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import { useStore } from '@codelab/frontend/infra/mobx'
import { ModalForm } from '@codelab/frontend-presentation-components-form'
import type { IUpdateComponentData } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { updateComponentSchema } from './update-component.schema'

export const UpdateComponentModal = observer(() => {
  const { componentService } = useStore()
  const component = componentService.updateModal.component

  const handleSubmit = (componentDTO: IUpdateComponentData) => {
    return componentService.update(componentDTO)
  }

  const model = { id: component?.id, name: component?.name }
  const closeModal = () => componentService.updateModal.close()

  return (
    <ModalForm.Modal
      okText="Update Component"
      onCancel={closeModal}
      open={componentService.updateModal.isOpen}
      title={<span className="font-semibold">Update component</span>}
    >
      {/* <UpdateComponentForm component={component} /> */}
      <ModalForm.Form<IUpdateComponentData>
        model={model}
        onSubmit={handleSubmit}
        onSubmitError={createFormErrorNotificationHandler({
          title: 'Error while creating component',
        })}
        onSubmitSuccess={closeModal}
        schema={updateComponentSchema}
        uiKey={MODEL_ACTION.UpdateComponent.key}
      >
        <AutoFields />
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})
