'use client'

import type { ApolloError } from '@apollo/client'
import type { IUpdateDomainData } from '@codelab/frontend/abstract/domain'
import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import { useCurrentApp } from '@codelab/frontend/presentation/container'
import { useErrorNotify } from '@codelab/frontend/shared/utils'
import { useStore } from '@codelab/frontend-application-shared-store/provider'
import { checkDomainExists } from '@codelab/frontend-domain-domain/errors'
import { ModalForm } from '@codelab/frontend-presentation-components-form'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { updateDomainSchema } from './update-domain.schema'
import { updateDomainUseCase } from './update-domain.use-case'
import { useUpdateDomainModal } from './update-domain-modal.state'

export const UpdateDomainModal = observer(() => {
  const updateDomainModal = useUpdateDomainModal()
  const domain = updateDomainModal.data
  const isOpen = updateDomainModal.isOpen
  const app = useCurrentApp()

  if (!domain) {
    return null
  }

  const onSubmit = (domainDto: IUpdateDomainData) => {
    return updateDomainUseCase(domain, domainDto)
  }

  const closeModal = () => updateDomainModal.close()

  const onError = useErrorNotify({
    description: '',
    title: 'Error while updating app domain',
  })

  const onSubmitError = (error: unknown) => {
    if (!checkDomainExists(error as ApolloError)) {
      void onError()
    }
  }

  const model = {
    app: { id: app.id },
    id: domain.id,
    name: domain.name,
  }

  return (
    <ModalForm.Modal okText="Update Domain" onCancel={closeModal} open={isOpen}>
      <ModalForm.Form<IUpdateDomainData>
        model={model}
        onSubmit={onSubmit}
        onSubmitError={onSubmitError}
        onSubmitSuccess={closeModal}
        schema={updateDomainSchema}
        uiKey={MODEL_ACTION.UpdateDomain.key}
      >
        <AutoFields omitFields={['storeId']} />
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})
