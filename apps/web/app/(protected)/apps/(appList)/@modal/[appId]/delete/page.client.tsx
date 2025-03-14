'use client'

import { DeleteAppModal } from '@codelab/frontend-application-app/use-cases/delete-app'
import { AppConnector } from '@codelab/frontend-application-app/views'

export const DeleteAppModalContainer = ({ id }: { id: string }) => {
  return (
    <AppConnector id={id}>{(app) => <DeleteAppModal app={app} />}</AppConnector>
  )
}
