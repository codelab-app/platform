'use client'

import { AppConnector } from '../../views/App.connector'
import { BuildAppModal } from './BuildAppModal'

export const BuildAppModalContainer = ({ id }: { id: string }) => {
  return (
    <AppConnector id={id}>{(app) => <BuildAppModal app={app} />}</AppConnector>
  )
}
