import type { IUpdateComponentData } from '@codelab/frontend/abstract/domain'
import { useStore } from '@codelab/frontend/application/shared/store'
import { ModalForm } from '@codelab/frontend/presentation/view'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
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
      >
        <AutoFields />
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})
