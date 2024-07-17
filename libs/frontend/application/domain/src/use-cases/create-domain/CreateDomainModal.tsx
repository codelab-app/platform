'use client'

import type { ApolloError } from '@apollo/client'
import type { ICreateDomainData } from '@codelab/frontend/abstract/domain'
import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import { useCurrentApp } from '@codelab/frontend/presentation/container'
import { useErrorNotify } from '@codelab/frontend/shared/utils'
import { useDomainStore } from '@codelab/frontend-application-shared-store/provider'
import {
  checkDomainExists,
  DOMAIN_EXISTS_ERROR,
} from '@codelab/frontend-domain-domain/errors'
import { ModalForm } from '@codelab/frontend-presentation-components-form'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { v4 } from 'uuid'
import { createDomainSchema } from './create-domain.schema'
import { createDomainUseCase } from './create-domain.use-case'
import { useCreateDomainModal } from './create-domain-modal.state'

export const CreateDomainModal = observer(() => {
  const { userDomainService } = useDomainStore()
  const app = useCurrentApp()
  const createDomainModal = useCreateDomainModal()
  const domainStore = useDomainStore()

  const model = {
    app: { id: app.id },
    auth0Id: userDomainService.user.auth0Id,
    id: v4(),
  }

  const onSubmit = (data: ICreateDomainData) => {
    return createDomainUseCase(data, domainStore)
  }

  const closeModal = () => createDomainModal.close()

  const onError = useErrorNotify({
    description: DOMAIN_EXISTS_ERROR,
    title: 'Error while adding app domain',
  })

  const onSubmitError = (error: unknown) => {
    if (!checkDomainExists(error as ApolloError)) {
      void onError()
    }
  }

  return (
    <ModalForm.Modal
      okText="Create Domain"
      onCancel={closeModal}
      open={createDomainModal.isOpen}
    >
      <ModalForm.Form<ICreateDomainData>
        model={model}
        onSubmit={onSubmit}
        onSubmitError={onSubmitError}
        onSubmitSuccess={closeModal}
        schema={createDomainSchema}
        uiKey={MODEL_ACTION.CreateDomain.key}
      >
        <AutoFields />
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})
