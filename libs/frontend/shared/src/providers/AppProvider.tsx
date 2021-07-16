import { __AppFragment, useGetAppLazyQuery } from '@codelab/codegen/graphql'
import React, { PropsWithChildren, useEffect } from 'react'

type IAppContext = {
  app: __AppFragment
  loading: boolean
}

type AppProviderProps = {
  appId?: string
}

export const AppContext = React.createContext<IAppContext>(undefined!)

export const _AppProvider = ({
  appId,
  children,
}: PropsWithChildren<AppProviderProps>) => {
  const [load, { data, loading }] = useGetAppLazyQuery()
  const app = data?.getApp

  useEffect(() => {
    if (appId) {
      load({ variables: { input: { byId: { appId } } } })
    }
  }, [appId, load])

  if (!app) {
    return null
  }

  return (
    <AppContext.Provider
      value={{
        app,
        loading,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const AppProvider = React.memo(_AppProvider, (prev, next) => {
  return prev.appId !== next.appId
})
