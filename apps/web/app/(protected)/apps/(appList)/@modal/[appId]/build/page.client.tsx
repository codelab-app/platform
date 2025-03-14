'use client'

import { BuildAppModal } from '@codelab/frontend-application-app/use-cases/build-app'
import { DeleteAppModal } from '@codelab/frontend-application-app/use-cases/delete-app'
import { AppConnector } from '@codelab/frontend-application-app/views'

export const BuildAppModalContainer = ({ id }: { id: string }) => {
  return (
    <AppConnector id={id}>{(app) => <BuildAppModal app={app} />}</AppConnector>
  )
}
