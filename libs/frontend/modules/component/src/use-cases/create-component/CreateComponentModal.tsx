import { useUserState } from '@codelab/frontend/modules/user'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import tw from 'twin.macro'
import { AutoFields } from 'uniforms-antd'
import { ComponentStore } from '../../store/ComponentStore'
import { createComponentSchema } from './createComponentSchema'
import { CreateComponentInput } from './types'

export interface CreateComponentModalProps {
  componentStore: ComponentStore
}

export const CreateComponentModal = observer<CreateComponentModalProps>(
  ({ componentStore }) => {
    const { user } = useUserState()

    const handleSubmit = (input: CreateComponentInput) =>
      componentStore.createComponent(input, user.auth0Id)

    const closeModal = () => componentStore.createModal.close()

    const onSubmitError = createNotificationHandler({
      title: 'Error while creating component',
    })

    return (
      <ModalForm.Modal
        okText="Create Component"
        onCancel={closeModal}
        title={<span css={tw`font-semibold`}>Create component</span>}
        visible={componentStore.createModal.isOpen}
      >
        <ModalForm.Form<CreateComponentInput>
          model={{}}
          onSubmit={handleSubmit}
          onSubmitError={onSubmitError}
          onSubmitSuccess={closeModal}
          schema={createComponentSchema}
        >
          <AutoFields />
        </ModalForm.Form>
      </ModalForm.Modal>
    )
  },
)
