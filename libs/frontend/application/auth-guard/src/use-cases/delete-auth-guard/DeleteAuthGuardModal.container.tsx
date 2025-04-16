'use client'

import type { IRef } from '@codelab/shared-abstract-core'

import { AuthGuardConnector } from '@codelab/frontend-infra-connector'

import { DeleteAuthGuardModal } from './DeleteAuthGuardModal'

export const DeleteAuthGuardModalContainer = ({ id }: IRef) => {
  return (
    <AuthGuardConnector id={id}>
      {(authGuard) => <DeleteAuthGuardModal authGuard={authGuard} />}
    </AuthGuardConnector>
  )
}

export default DeleteAuthGuardModalContainer
