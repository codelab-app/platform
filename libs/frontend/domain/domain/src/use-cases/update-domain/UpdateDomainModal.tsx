import {
  IDomainService,
  IUpdateDomainDTO,
  IUserService,
} from '@codelab/frontend/abstract/core'
import { useCurrentAppId } from '@codelab/frontend/presenter/container'
import { useNotify } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { handleDomainExistError } from '../../errors'
import { updateDomainSchema } from './updateDomainSchema'

export const UpdateDomainModal = observer<{
  domainService: IDomainService
  userService: IUserService
}>(({ domainService, userService }) => {
  const domain = domainService.updateModal.domain
  const currentAppId = useCurrentAppId()

  if (!domain || !domain?.id) {
    return null
  }

  const onSubmit = (input: IUpdateDomainDTO) => {
    return domainService.update(input)
  }

  const closeModal = () => domainService.updateModal.close()

  if (!userService?.user) {
    throw new Error('Missing user for update app')
  }

  const { onError } = useNotify({}, {})

  const onSubmitError = (error: unknown) => {
    if (!handleDomainExistError(error, onError)) {
      onError('Error while updating app domain')
    }
  }

  const model: IUpdateDomainDTO = {
    name: domain?.name,
    appId: currentAppId,
    id: domain.id,
  }

  return (
    <ModalForm.Modal
      okText="Update Domain"
      onCancel={closeModal}
      visible={true}
    >
      <ModalForm.Form<IUpdateDomainDTO>
        model={model}
        onSubmit={onSubmit}
        onSubmitError={onSubmitError}
        onSubmitSuccess={closeModal}
        schema={updateDomainSchema}
      >
        <AutoFields omitFields={['storeId']} />
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})
