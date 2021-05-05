import {
  GetAppPageQuery,
  Query_Root,
  useGetAppPageQuery,
} from '@codelab/hasura'
import React, { PropsWithChildren } from 'react'
import { PropsWithIds } from '../interfaces'

type IAppContext = PropsWithIds<'appId' | 'pageId'> & {
  app?: GetAppPageQuery['app_by_pk']
  page?: GetAppPageQuery['page_by_pk']
  styles?: Query_Root['style']
  loading: boolean
}

export const AppContext = React.createContext<IAppContext>(undefined!)

export const _AppProvider = ({
  appId,
  pageId,
  children,
}: PropsWithChildren<Pick<IAppContext, 'appId' | 'pageId'>>) => {
  const { data, loading } = useGetAppPageQuery({
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
        loading,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const AppProvider = React.memo(_AppProvider, (prev, next) => {
  return prev.appId !== next.appId || prev.pageId !== next.pageId
})
