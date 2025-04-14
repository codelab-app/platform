'use client'

import type { IAppModel } from '@codelab/frontend/abstract/domain'

import { AppConnector } from '@codelab/frontend/infra/connector'

import { UpdateAppModal } from './UpdateAppModal'

export const UpdateAppModalContainer = ({ id }: { id: string }) => {
  return (
    <AppConnector id={id}>
      {(app: IAppModel) => <UpdateAppModal app={app} />}
    </AppConnector>
  )
}

UpdateAppModalContainer.displayName = 'UpdateAppModalContainer'
