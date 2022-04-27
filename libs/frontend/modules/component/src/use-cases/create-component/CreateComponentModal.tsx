import {
  COMPONENT_SERVICE,
  USER_SERVICE,
  WithServices,
} from '@codelab/frontend/abstract/core'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import { ICreateComponentDTO } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import tw from 'twin.macro'
import { AutoFields } from 'uniforms-antd'
import { createComponentSchema } from './createComponentSchema'

export const CreateComponentModal = observer<
  WithServices<COMPONENT_SERVICE | USER_SERVICE>
>(({ componentService, userService }) => {
  const user = userService.user

  const handleSubmit = (input: ICreateComponentDTO) => {
    return componentService.create(input)
  }

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
        model={{
          auth0Id: user?.auth0Id,
        }}
        onSubmit={handleSubmit}
        onSubmitError={onSubmitError}
        onSubmitSuccess={closeModal}
        schema={createComponentSchema}
      >
        <AutoFields />
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})
