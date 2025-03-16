'use client'

import { AppConnector } from '@codelab/frontend-domain-app/store'

import { DeleteAppModal } from './DeleteAppModal'

export const DeleteAppModalContainer = ({ id }: { id: string }) => {
  return (
    <AppConnector id={id}>{(app) => <DeleteAppModal app={app} />}</AppConnector>
  )
}

DeleteAppModalContainer.displayName = 'DeleteAppModalContainer'
