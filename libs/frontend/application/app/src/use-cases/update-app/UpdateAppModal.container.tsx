'use client'

import type { IAppModel } from '@codelab/frontend/abstract/domain'

import { AppConnector, useApp } from '@codelab/frontend/infra/connector'

import { UpdateAppModal } from './UpdateAppModal'

export const UpdateAppModalContainer = ({ id }: { id: string }) => {
  const app = useApp(id)

  return <UpdateAppModal app={app} />
}

UpdateAppModalContainer.displayName = 'UpdateAppModalContainer'
