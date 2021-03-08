import React, { PropsWithChildren } from 'react'
import { PropsWithIds } from '@codelab/frontend'
import {
  AppFragmentsFragment,
  PageFragmentsFragment,
  StyleFragmentsFragment,
  useGetAppQuery,
  useGetPageQuery,
  useGetStylesQuery,
} from '@codelab/generated'

type IAppContext = PropsWithIds<'appId' | 'pageId'> & {
  app: AppFragmentsFragment
  page: PageFragmentsFragment
  styles: Array<StyleFragmentsFragment>
}

export const AppContext = React.createContext<IAppContext>(undefined!)

export const _AppProvider = ({
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
  const { data: stylesData, loading: stylesLoading } = useGetStylesQuery({
    variables: { input: { appId } },
  })

  const app = appData?.getApp
  const page = pageData?.getPage
  const styles = stylesData?.getStyles

  if (appLoading || pageLoading || stylesLoading || !app || !page || !styles) {
    return null
  }

  return (
    <AppContext.Provider
      value={{
        appId,
        pageId,
        app,
        page,
        styles,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const AppProvider = React.memo(_AppProvider, (prev, next) => {
  return prev.appId !== next.appId || prev.pageId !== next.pageId
})
