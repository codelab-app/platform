'use client'

import type { IRef } from '@codelab/shared/abstract/core'

import { PageType, UiKey } from '@codelab/frontend/abstract/types'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { ModalForm } from '@codelab/frontend-presentation-components-form'
import { emptyJsonSchema } from '@codelab/frontend-presentation-components-form/schema'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'

import { useAuthGuardService } from '../../services'

export const DeleteAuthGuardModal = observer<IRef>(({ id }) => {
  const router = useRouter()
  const authGuardService = useAuthGuardService()
  const { authGuardDomainService } = useDomainStore()
  const authGuard = authGuardDomainService.authGuards.get(id)
  const closeModal = () => router.push(PageType.AuthGuards())

  if (!authGuard) {
    return null
  }

  const onSubmit = () => authGuardService.removeMany([authGuard])

  return (
    <ModalForm.Modal
      okText="Delete Auth Guard"
      onCancel={closeModal}
      open={true}
      title="Delete Confirmation"
      uiKey={UiKey.AuthGuardModalDelete}
    >
      <ModalForm.Form
        errorMessage="Error while deleting auth guard"
        model={{}}
        onSubmit={onSubmit}
        onSubmitSuccess={closeModal}
        schema={emptyJsonSchema}
      >
        <h4>
          Are you sure you want to delete auth guard "{authGuard.name}
          "?
        </h4>
      </ModalForm.Form>
    </ModalForm.Modal>
  )
})
