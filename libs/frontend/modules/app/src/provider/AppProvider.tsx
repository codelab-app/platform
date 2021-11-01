import React, { PropsWithChildren, useEffect } from 'react'
import { AppFragment } from '../App.fragment.graphql.gen'
import { useLazyGetAppQuery } from '../use-cases/app.endpoints'

type IAppContext = {
  app: AppFragment
  loading: boolean
}

type AppProviderProps = {
  appId?: string
}

// TODO remove context
export const AppContext = React.createContext<IAppContext>(undefined!)

export const _AppProvider = ({
  appId,
  children,
}: PropsWithChildren<AppProviderProps>) => {
  const [load, { data, isLoading }] = useLazyGetAppQuery()
  const app = data?.app

  useEffect(() => {
    if (appId) {
      load({ input: { byId: { appId } } })
    }
  }, [appId, load])

  if (!app) {
    return null
  }

  return (
    <AppContext.Provider
      value={{
        app,
        loading: isLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const AppProvider = React.memo(_AppProvider, (prev, next) => {
  return prev.appId !== next.appId
})
