import { UiKey } from '@codelab/frontend/abstract/types'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend-presentation-components-form'
import type { IUpdateComponentData } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { useComponentService } from '../../services'
import { updateComponentSchema } from './update-component.schema'
import { useUpdateComponentModal } from './update-component.state'

export const UpdateComponentModal = observer(() => {
  const componentService = useComponentService()
  const updateComponentModal = useUpdateComponentModal()
  const component = updateComponentModal.data

  const handleSubmit = (componentDTO: IUpdateComponentData) => {
    return componentService.update(componentDTO)
  }

  const model = { id: component?.id, name: component?.name }
  const closeModal = () => updateComponentModal.close()

  return (
    <ModalForm.Modal
      okText="Update Component"
      onCancel={closeModal}
      open={updateComponentModal.isOpen}
      title={<span className="font-semibold">Update component</span>}
      uiKey={UiKey.UpdateComponentModal}
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
      >
        <AutoFields />
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})
