import { useUser } from '@auth0/nextjs-auth0'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import { ICreateComponentDTO } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import tw from 'twin.macro'
import { AutoFields } from 'uniforms-antd'
import { WithComponentService } from '../../store'
import { createComponentSchema } from './createComponentSchema'

export const CreateComponentModal = observer<WithComponentService>(
  ({ componentService }) => {
    const { user } = useUser()

    const handleSubmit = (input: ICreateComponentDTO) =>
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
        <ModalForm.Form<ICreateComponentDTO>
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
