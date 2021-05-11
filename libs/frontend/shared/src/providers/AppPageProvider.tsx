import {
  GetAppPageQuery,
  Query_Root,
  useGetAppPageQuery,
} from '@codelab/hasura'
import React, { PropsWithChildren } from 'react'
import { PropsWithIds } from '../interfaces'

type IAppPageContext = PropsWithIds<'appId' | 'pageId'> & {
  app?: GetAppPageQuery['app_by_pk']
  page?: GetAppPageQuery['page_by_pk']
  styles?: Query_Root['style']
  loading: boolean
}

export const AppPageContext = React.createContext<IAppPageContext>(undefined!)

export const _AppPageProvider = ({
  appId,
  pageId,
  children,
}: PropsWithChildren<Pick<IAppPageContext, 'appId' | 'pageId'>>) => {
  const { data, loading } = useGetAppPageQuery({
    variables: {
      appId,
      pageId,
    },
  })

  return (
    <AppPageContext.Provider
      value={{
        appId,
        pageId,
        app: data?.app_by_pk,
        page: data?.page_by_pk,
        loading,
      }}
    >
      {children}
    </AppPageContext.Provider>
  )
}

export const AppPageProvider = React.memo(_AppPageProvider, (prev, next) => {
  return prev.appId !== next.appId || prev.pageId !== next.pageId
})
