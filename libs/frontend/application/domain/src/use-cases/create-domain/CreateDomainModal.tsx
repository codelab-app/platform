import type { ApolloError } from '@apollo/client'
import type { ICreateDomainData } from '@codelab/frontend/abstract/core'
import { useStore } from '@codelab/frontend/application/shared/store'
import { useCurrentApp } from '@codelab/frontend/presentation/container'
import { ModalForm } from '@codelab/frontend/presentation/view'
import { useErrorNotify } from '@codelab/frontend/shared/utils'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { v4 } from 'uuid'
import {
  checkDomainExists,
  DOMAIN_EXISTS_ERROR,
} from '../../../../../domain/domain/src/errors'
import { createDomainSchema } from './create-domain.schema'

export const CreateDomainModal = observer(() => {
  const { domainService, userService } = useStore()
  const app = useCurrentApp()

  const model = {
    app: { id: app?.id },
    auth0Id: userService.user.auth0Id,
    id: v4(),
  }

  const onSubmit = (data: ICreateDomainData) => {
    return domainService.create(data)
  }

  const closeModal = () => domainService.createModal.close()

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
