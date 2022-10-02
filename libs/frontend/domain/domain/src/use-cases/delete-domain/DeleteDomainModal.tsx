import { IDomainService, IUserService } from '@codelab/frontend/abstract/core'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { emptyJsonSchema, ModalForm } from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'
import { AutoFields } from 'uniforms-antd'

export const DeleteDomainModal = observer<{
  domainService: IDomainService
  userService: IUserService
}>(({ domainService, userService }) => {
  const closeModal = () => domainService.deleteModal.close()
  const domain = domainService.deleteModal.domain

  const onSubmit = () => {
    if (!domain?.id) {
      return Promise.reject('Domain ID not defined in DeleteDomainModal')
    }

    return domainService.delete(domain.id)
  }

  const onSubmitError = createNotificationHandler({
    title: 'Error while deleting domain',
  })

  if (!domainService.deleteModal.domain) {
    return null
  }

  const model = {
    id: domainService.deleteModal.domain.id,
    auth0Id: userService.user?.auth0Id,
  }

  return (
    <ModalForm.Modal
      okText="Delete"
      onCancel={closeModal}
      title={<span css={tw`font-semibold`}>Delete domain</span>}
      visible={domainService.deleteModal.isOpen}
    >
      <ModalForm.Form
        model={model}
        onSubmit={onSubmit}
        onSubmitError={onSubmitError}
        onSubmitSuccess={closeModal}
        schema={emptyJsonSchema}
      >
        <h4>Are you sure you want to delete the domain "{domain?.name}"?</h4>
        <AutoFields />
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})
