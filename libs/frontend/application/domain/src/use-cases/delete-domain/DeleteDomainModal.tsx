'use client'

import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import { useDomainStore } from '@codelab/frontend-application-shared-store/provider'
import { ModalForm } from '@codelab/frontend-presentation-components-form'
import { emptyJsonSchema } from '@codelab/frontend-presentation-components-form/schema'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { useDeleteDomainModal } from './delete-domain.state'
import { deleteDomainUseCase } from './delete-domain.use-case'

export const DeleteDomainModal = observer(() => {
  const deleteDomainModal = useDeleteDomainModal()
  const closeModal = () => deleteDomainModal.close()
  const domain = deleteDomainModal.data
  const domainStore = useDomainStore()

  const onSubmit = () => {
    if (!domain) {
      return Promise.reject()
    }

    return deleteDomainUseCase(domain.current, domainStore)
  }

  const model = {
    id: deleteDomainModal.data?.id,
  }

  return (
    <ModalForm.Modal
      okText="Delete"
      onCancel={closeModal}
      open={deleteDomainModal.isOpen}
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
        <h4>
          Are you sure you want to delete the domain "{domain?.current.name}"?
        </h4>
        <AutoFields />
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})
