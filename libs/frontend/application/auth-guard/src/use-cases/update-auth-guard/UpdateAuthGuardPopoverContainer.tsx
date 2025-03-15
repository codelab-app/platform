import type { IRef } from '@codelab/shared/abstract/core'

import { AuthGuardConnector } from '../../views'
import { UpdateAuthGuardPopover } from './UpdateAuthGuardPopover'

export const UpdateAuthGuardPopoverContainer = ({ id }: IRef) => {
  return (
    <AuthGuardConnector id={id}>
      {(authGuard) => <UpdateAuthGuardPopover authGuard={authGuard} />}
    </AuthGuardConnector>
  )
}
