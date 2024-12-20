'use client'

import type { IDomainModel } from '@codelab/frontend/abstract/domain'

import { PageType, UiKey } from '@codelab/frontend/abstract/types'
import { createFormErrorNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend-presentation-components-form'
import { emptyJsonSchema } from '@codelab/frontend-presentation-components-form/schema'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'
import { AutoFields } from 'uniforms-antd'

import { useDomainService } from '../../services'

export const DeleteDomainModal = observer<{ domain: IDomainModel }>(
  ({ domain }) => {
    const domainService = useDomainService()
    const app = domain.app
    const router = useRouter()

    const onSubmit = () => {
      return domainService.removeMany([domain])
    }

    const model = {
      id: domain.id,
    }

    const goBack = () => {
      router.push(PageType.DomainList({ appId: app.id }))
    }

    return (
      <ModalForm.Modal
        okText="Delete"
        onCancel={goBack}
        open={true}
        title={<span className="font-semibold">Delete domain</span>}
        uiKey={UiKey.DomainModalDelete}
      >
        <ModalForm.Form
          model={model}
          onSubmit={onSubmit}
          onSubmitError={createFormErrorNotificationHandler({
            title: 'Error while deleting domain',
          })}
          onSubmitSuccess={goBack}
          schema={emptyJsonSchema}
        >
          <h4>Are you sure you want to delete the domain "{domain.name}"?</h4>
          <AutoFields />
        </ModalForm.Form>
      </ModalForm.Modal>
    )
  },
)
