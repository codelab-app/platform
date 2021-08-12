import { ElementTree, useElementTree } from '@codelab/frontend/modules/builder'
import {
  PageFullFragment,
  useGetPageQuery,
} from '@codelab/shared/codegen/graphql'
import { useRouter } from 'next/router'
import * as React from 'react'

export interface PageContextType {
  pageId: string
  page: PageFullFragment
  tree: ElementTree
  loading: boolean
}

const defaultContext: PageContextType = {
  pageId: null!,
  tree: null!,
  page: null!,
  loading: false,
}

export const PageContext = React.createContext(defaultContext)

export const PageQueryProvider = ({
  children,
}: React.PropsWithChildren<unknown>) => {
  const { query } = useRouter()
  const pageId = query.pageId as string

  const { data, loading } = useGetPageQuery({
    variables: { input: { pageId } },
  })

  const page = pageId && data?.page ? data.page : null
  const tree = useElementTree(page?.elements)

  if (!pageId || !page) {
    return null
  }

  return (
    <PageContext.Provider value={{ page, pageId, tree, loading }}>
      {children}
    </PageContext.Provider>
  )
}

export const withPageQueryProvider = <TProps extends any>(
  Component: React.ComponentType<TProps>,
) => {
  return (props: TProps) => (
    <PageQueryProvider>
      <Component {...(props as any)} />
    </PageQueryProvider>
  )
}
