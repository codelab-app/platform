'use client'

import { UiKey } from '@codelab/frontend/abstract/types'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend-presentation-components-form'
import { emptyJsonSchema } from '@codelab/frontend-presentation-components-form/schema'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { useDomainService } from '../../services'
import { useDeleteDomainModal } from './delete-domain.state'

export const DeleteDomainModal = observer(() => {
  const deleteDomainModal = useDeleteDomainModal()
  const closeModal = () => deleteDomainModal.close()
  const domainService = useDomainService()
  const domain = deleteDomainModal.data

  const onSubmit = () => {
    if (!domain) {
      return Promise.reject()
    }

    return domainService.remove(domain.current)
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
      uiKey={UiKey.DeleteDomainModal}
    >
      <ModalForm.Form
        model={model}
        onSubmit={onSubmit}
        onSubmitError={createFormErrorNotificationHandler({
          title: 'Error while deleting domain',
        })}
        onSubmitSuccess={closeModal}
        schema={emptyJsonSchema}
      >
        <h4>
          Are you sure you want to delete the domain "{domain?.current.name}"?
        </h4>
        <AutoFields />
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})
