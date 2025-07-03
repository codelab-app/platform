'use client'

import type { ApolloError } from '@apollo/client'
import type { ICreateDomainData } from '@codelab/frontend-abstract-domain'

import { RoutePaths } from '@codelab/frontend-abstract-application'
import { UiKey } from '@codelab/frontend-abstract-types'
import {
  checkDomainExists,
  DOMAIN_EXISTS_ERROR,
} from '@codelab/frontend-domain-domain/errors'
import { useErrorNotify } from '@codelab/frontend-infra-context'
import { useDomainStore } from '@codelab/frontend-infra-mobx-context'
import { ModalForm } from '@codelab/frontend-presentation-components-form'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'
import { AutoFields } from 'uniforms-antd'
import { v4 } from 'uuid'

import { useDomainService } from '../../services'
import { createDomainSchema } from './create-domain.schema'

interface CreateDomainModalProps {
  appId: string
}

export const CreateDomainModal = observer<CreateDomainModalProps>(
  ({ appId }) => {
    const { userDomainService } = useDomainStore()
    const domainService = useDomainService()
    const router = useRouter()

    const model = {
      app: { id: appId },
      auth0Id: userDomainService.currentUser.auth0Id,
      id: v4(),
    }

    const onSubmit = (data: ICreateDomainData) => {
      return domainService.create(data)
    }

    const goBack = () => {
      router.push(RoutePaths.Domain.list({ appId }))
    }

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
        onCancel={goBack}
        open={true}
        uiKey={UiKey.DomainModalCreate}
      >
        <ModalForm.Form<ICreateDomainData>
          model={model}
          onSubmit={onSubmit}
          onSubmitError={onSubmitError}
          onSubmitSuccess={goBack}
          schema={createDomainSchema}
        >
          <AutoFields />
        </ModalForm.Form>
      </ModalForm.Modal>
    )
  },
)
