import React, { PropsWithChildren } from 'react'
import { PropsWithIds } from '@codelab/frontend'
import { RootAppQuery, useRootAppQuery } from '../../../../../libs/generated/src/graphql-client-hasura.generated'


type IAppContext = PropsWithIds<'appId' | 'pageId'> & {
  app?: RootAppQuery["app_by_pk"];
  page?: RootAppQuery["page_by_pk"];
  loading: boolean;
}

export const AppContext = React.createContext<IAppContext>(undefined!)

export const _AppProvider = ({
                               appId,
                               pageId,
                               children,
                             }: PropsWithChildren<Pick<IAppContext, 'appId' | 'pageId'>>) => {
  const { data, loading } = useRootAppQuery({
    variables: {
      appId,
      pageId,
    },
  })

  return (
    <AppContext.Provider
      value={{
        appId,
        pageId,
        app: data?.app_by_pk,
        page: data?.page_by_pk,
        loading
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const AppProvider = React.memo(_AppProvider, (prev, next) => {
  return prev.appId !== next.appId || prev.pageId !== next.pageId
})
