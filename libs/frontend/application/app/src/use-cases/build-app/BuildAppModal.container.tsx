'use client'

import type { IAppModel } from '@codelab/frontend/abstract/domain'

import { AppConnector } from '@codelab/frontend/infra/connector'

import { BuildAppModal } from './BuildAppModal'

export const BuildAppModalContainer = ({ id }: { id: string }) => {
  return (
    <AppConnector id={id}>{(app) => <BuildAppModal app={app} />}</AppConnector>
  )
}
