import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import tw from 'twin.macro'
import { AutoFields } from 'uniforms-antd'
import { ComponentService } from '../../store/ComponentService'
import { updateComponentSchema } from './createComponentSchema'
import { UpdateComponentInput } from './types'

export interface UpdateComponentModalProps {
  componentStore: ComponentService
}

export const UpdateComponentModal = observer<UpdateComponentModalProps>(
  ({ componentStore }) => {
    const updatedComponent = componentStore.updateModal.component

    if (!updatedComponent) {
      return null
    }

    const handleSubmit = (input: UpdateComponentInput) => {
      if (!updatedComponent) {
        throw new Error('componentStore.updateModal.component is null')
      }

      return componentStore.update(updatedComponent, input)
    }

    const model = { name: updatedComponent.name }
    const closeModal = () => componentStore.updateModal.close()

    return (
      <ModalForm.Modal
        okText="Update Component"
        onCancel={closeModal}
        title={<span css={tw`font-semibold`}>Update component</span>}
        visible={componentStore.updateModal.isOpen}
      >
        <ModalForm.Form<UpdateComponentInput>
          model={model}
          onSubmit={handleSubmit}
          onSubmitError={createNotificationHandler({
            title: 'Error while creating component',
            type: 'error',
          })}
          onSubmitSuccess={closeModal}
          schema={updateComponentSchema}
        >
          <AutoFields />
        </ModalForm.Form>
      </ModalForm.Modal>
    )
  },
)
