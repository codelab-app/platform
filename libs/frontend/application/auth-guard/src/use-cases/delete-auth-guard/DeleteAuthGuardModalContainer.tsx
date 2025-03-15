import type { IRef } from '@codelab/shared/abstract/core'

import { AuthGuardConnector } from '../../views'
import { DeleteAuthGuardModal } from './DeleteAuthGuardModal'

export const DeleteAuthGuardModalContainer = ({ id }: IRef) => {
  return (
    <AuthGuardConnector id={id}>
      {(authGuard) => <DeleteAuthGuardModal authGuard={authGuard} />}
    </AuthGuardConnector>
  )
}

export default DeleteAuthGuardModalContainer
