'use client'

import type { ApolloError } from '@apollo/client'
import type {
  IDomainModel,
  IUpdateDomainData,
} from '@codelab/frontend/abstract/domain'

import { PageType, UiKey } from '@codelab/frontend/abstract/types'
import { useCurrentApp } from '@codelab/frontend/presentation/container'
import { useErrorNotify } from '@codelab/frontend/shared/utils'
import { checkDomainExists } from '@codelab/frontend-domain-domain/errors'
import { ModalForm } from '@codelab/frontend-presentation-components-form'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'
import { AutoFields } from 'uniforms-antd'

import { useDomainService } from '../../services'
import { updateDomainSchema } from './update-domain.schema'

interface UpdateDomainModalProps {
  domain: IDomainModel
}

export const UpdateDomainModal = observer(
  ({ domain }: UpdateDomainModalProps) => {
    const app = domain.app
    const domainService = useDomainService()
    const router = useRouter()

    const onSubmit = (domainDto: IUpdateDomainData) => {
      return domainService.update(domainDto)
    }

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

    const goBack = () => {
      router.push(PageType.DomainList({ appId: app.id }))
    }

    return (
      <ModalForm.Modal
        okText="Update Domain"
        onCancel={goBack}
        open={true}
        uiKey={UiKey.DomainModalUpdate}
      >
        <ModalForm.Form<IUpdateDomainData>
          model={model}
          onSubmit={onSubmit}
          onSubmitError={onSubmitError}
          onSubmitSuccess={goBack}
          schema={updateDomainSchema}
        >
          <AutoFields omitFields={['storeId']} />
        </ModalForm.Form>
      </ModalForm.Modal>
    )
  },
)
