import React, { PropsWithChildren } from 'react'
import { PropsWithIds } from '@codelab/frontend'
import {
  AppFragmentsFragment,
  PageFragmentsFragment,
  useGetAppQuery,
  useGetPageQuery,
} from '@codelab/generated'

type IAppContext = PropsWithIds<'appId' | 'pageId'> & {
  app: AppFragmentsFragment
  page: PageFragmentsFragment
}

export const AppContext = React.createContext<IAppContext>(undefined!)

export const AppProvider = ({
  appId,
  pageId,
  children,
}: PropsWithChildren<Pick<IAppContext, 'appId' | 'pageId'>>) => {
  const { data: appData, loading: appLoading } = useGetAppQuery({
    variables: { input: { appId } },
  })
  const { data: pageData, loading: pageLoading } = useGetPageQuery({
    variables: { input: { pageId } },
  })

  const app = appData?.getApp
  const page = pageData?.getPage

  if (appLoading || pageLoading || !app || !page) {
    return null
  }

  return (
    <AppContext.Provider
      value={{
        appId,
        pageId,
        app,
        page,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
