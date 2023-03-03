import type {
  ICreateDomainData,
  IDomainService,
  IUserService,
} from '@codelab/frontend/abstract/core'
import { useCurrentAppId } from '@codelab/frontend/presenter/container'
import { useNotify } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { handleDomainExistError } from '../../errors'
import { createDomainSchema } from './createDomainSchema'

export const CreateDomainModal = observer<{
  domainService: IDomainService
  userService: IUserService
}>(({ domainService, userService }) => {
  const currentAppId = useCurrentAppId()

  const model = {
    app: { id: currentAppId },
    auth0Id: userService.user?.auth0Id,
  }

  const onSubmit = (data: ICreateDomainData) => {
    return domainService.create(data)
  }

  const closeModal = () => domainService.createModal.close()
  const { onError } = useNotify({}, {})

  const onSubmitError = (error: unknown) => {
    if (!handleDomainExistError(error, onError)) {
      onError('Error while adding app domain')
    }
  }

  return (
    <ModalForm.Modal
      okText="Create Domain"
      onCancel={closeModal}
      open={domainService.createModal.isOpen}
    >
      <ModalForm.Form
        model={model}
        onSubmit={onSubmit}
        onSubmitError={onSubmitError}
        onSubmitSuccess={closeModal}
        schema={createDomainSchema}
      >
        <AutoFields />
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})
