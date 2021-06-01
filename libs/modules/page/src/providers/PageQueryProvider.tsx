import { CytoscapeService } from '@codelab/frontend/cytoscape'
import { PageFullFragment, useGetPageLazyQuery } from '@codelab/graphql'
import { Core } from 'cytoscape'
import { useRouter } from 'next/router'
import * as React from 'react'
import { useEffect, useState } from 'react'

export interface PageContextType {
  pageId: string | null
  page: PageFullFragment | null
  cytoscapeRoot: Core | null
  loading: boolean
}

const defaultContext: PageContextType = {
  pageId: null,
  cytoscapeRoot: null,
  page: null,
  loading: false,
}

export const PageContext = React.createContext(defaultContext)

export const PageQueryProvider = ({
  children,
}: React.PropsWithChildren<unknown>) => {
  const { query } = useRouter()
  const pageId = query.pageId as string
  const [getPage, { data, loading }] = useGetPageLazyQuery()

  const [cytoscapeRoot, setCytoscapeRoot] =
    useState<PageContextType['cytoscapeRoot']>(null)

  useEffect(() => {
    getPage({ variables: { input: { pageId } } })
  }, [getPage, pageId])

  const page = pageId && data?.page ? data.page : null

  useEffect(() => {
    setCytoscapeRoot(page ? CytoscapeService.fromPage(page.rootElement) : null)
  }, [page])

  return (
    <PageContext.Provider value={{ page, pageId, cytoscapeRoot, loading }}>
      {children}
    </PageContext.Provider>
  )
}

export const withPageQueryProvider = <TProps extends Record<string, any>>(
  Component: React.ComponentType<TProps>,
) => {
  return (props: TProps) => (
    <PageQueryProvider>
      <Component {...props} />
    </PageQueryProvider>
  )
}
