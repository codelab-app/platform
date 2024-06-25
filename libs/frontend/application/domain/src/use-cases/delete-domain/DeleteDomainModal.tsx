import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import { useStore } from '@codelab/frontend-application-shared-store/provider'
import { ModalForm } from '@codelab/frontend-presentation-components-form'
import { emptyJsonSchema } from '@codelab/frontend-presentation-components-form/schema'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'

export const DeleteDomainModal = observer(() => {
  const { domainService } = useStore()
  const closeModal = () => domainService.deleteModal.close()
  const domain = domainService.deleteModal.domain

  const onSubmit = () => {
    if (!domain) {
      return Promise.reject()
    }

    return domainService.delete([domain])
  }

  if (!domainService.deleteModal.domain) {
    return null
  }

  const model = {
    id: domainService.deleteModal.domain.id,
  }

  return (
    <ModalForm.Modal
      okText="Delete"
      onCancel={closeModal}
      open={domainService.deleteModal.isOpen}
      title={<span className="font-semibold">Delete domain</span>}
    >
      <ModalForm.Form
        model={model}
        onSubmit={onSubmit}
        onSubmitError={createFormErrorNotificationHandler({
          title: 'Error while deleting domain',
        })}
        onSubmitSuccess={closeModal}
        schema={emptyJsonSchema}
        uiKey={MODEL_ACTION.DeleteDomain.key}
      >
        <h4>Are you sure you want to delete the domain "{domain?.name}"?</h4>
        <AutoFields />
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})
