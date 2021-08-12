import { AppProvider } from '@codelab/frontend/presenter/container'
import { useRouter } from 'next/router'
import React, { PropsWithChildren } from 'react'

/**
 * The App view
 */
export const BuilderTemplate = ({ children }: PropsWithChildren<any>) => {
  const { query } = useRouter()
  const appId = query.appId as string

  if (!appId) {
    throw new Error('Missing appId')
  }

  return <AppProvider appId={appId}>{children}</AppProvider>
}
