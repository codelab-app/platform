import { useUser } from '@auth0/nextjs-auth0'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import tw from 'twin.macro'
import { AutoFields } from 'uniforms-antd'
import { WithComponentService } from '../../store'
import { createComponentSchema } from './createComponentSchema'
import { CreateComponentInput } from './types'

export type CreateComponentModalProps = WithComponentService

export const CreateComponentModal = observer<CreateComponentModalProps>(
  ({ componentService }) => {
    const { user } = useUser()

    const handleSubmit = (input: CreateComponentInput) =>
      componentService.createComponent(input, user?.sub ?? '')

    const closeModal = () => componentService.createModal.close()

    const onSubmitError = createNotificationHandler({
      title: 'Error while creating component',
    })

    return (
      <ModalForm.Modal
        okText="Create Component"
        onCancel={closeModal}
        title={<span css={tw`font-semibold`}>Create component</span>}
        visible={componentService.createModal.isOpen}
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
