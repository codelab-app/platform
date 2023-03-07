import type {
  IDomainService,
  IUpdateDomainData,
  IUserService,
} from '@codelab/frontend/abstract/core'
import { useCurrentAppId } from '@codelab/frontend/presenter/container'
import { useNotify } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { handleDomainExistError } from '../../errors'
import { updateDomainSchema } from './updateDomain.schema'

export const UpdateDomainModal = observer<{
  domainService: IDomainService
  userService: IUserService
}>(({ domainService, userService }) => {
  const domain = domainService.updateModal.domain
  const currentAppId = useCurrentAppId()

  const onSubmit = (domainDTO: IUpdateDomainData) => {
    return domainService.update(domainDTO)
  }

  const closeModal = () => domainService.updateModal.close()
  const { onError } = useNotify({}, {})

  const onSubmitError = (error: unknown) => {
    if (!handleDomainExistError(error, onError)) {
      onError('Error while updating app domain')
    }
  }

  const model = {
    app: { id: currentAppId },
    id: domain?.id,
    name: domain?.name,
  }

  return (
    <ModalForm.Modal okText="Update Domain" onCancel={closeModal}>
      <ModalForm.Form<IUpdateDomainData>
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
