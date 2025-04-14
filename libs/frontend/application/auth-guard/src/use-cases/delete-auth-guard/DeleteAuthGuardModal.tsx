'use client'

import type { IAuthGuardModel } from '@codelab/frontend/abstract/domain'

import { RoutePaths } from '@codelab/frontend/abstract/application'
import { UiKey } from '@codelab/frontend/abstract/types'
import { ModalForm } from '@codelab/frontend-presentation-components-form'
import { emptyJsonSchema } from '@codelab/frontend-presentation-components-form/schema'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'

import { useAuthGuardService } from '../../services'

export const DeleteAuthGuardModal = observer<{ authGuard: IAuthGuardModel }>(
  ({ authGuard }) => {
    const router = useRouter()
    const authGuardService = useAuthGuardService()
    const closeModal = () => router.push(RoutePaths.AuthGuard.base())
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
  },
)
