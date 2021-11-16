import { withProvider } from '@codelab/frontend/presenter/container'
import { useRouter } from 'next/router'
import * as React from 'react'
import { AppProvider } from './AppProvider'

export const AppQueryProvider = ({
  children,
}: React.PropsWithChildren<unknown>) => {
  const { query } = useRouter()
  const appId = query.appId as string

  return <AppProvider appId={appId}>{children}</AppProvider>
}

export const withAppQueryProvider = withProvider(AppQueryProvider)
