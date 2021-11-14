import React, { PropsWithChildren } from 'react'
import { AppFragment } from '../graphql/App.fragment.graphql.gen'
import { useGetAppQuery } from '../store/appEndpoints'

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
  const { data, isLoading } = useGetAppQuery(
    {
      variables: { input: { byId: { appId: appId as string } } },
    },
    { skip: !appId },
  )

  const app = data?.app

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
