import { useRouter } from 'next/router'
import * as React from 'react'
import { AppProvider } from './AppProvider'
import { withProvider } from './withProvider'

/**
 * Like AppProvider, but takes appId from the query
 */
export const AppQueryProvider = ({
  children,
}: React.PropsWithChildren<unknown>) => {
  const { query } = useRouter()
  const appId = query.appId as string

  return <AppProvider appId={appId}>{children}</AppProvider>
}

export const withAppQueryProvider = withProvider(AppQueryProvider)
