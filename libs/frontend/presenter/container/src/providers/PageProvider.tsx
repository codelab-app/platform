import { ElementTree } from '@codelab/frontend/abstract/props'
import { useElementTree } from '@codelab/frontend/model/domain'
import {
  PageFullFragment,
  useGetPageQuery,
} from '@codelab/shared/codegen/graphql'
import { useRouter } from 'next/router'
import * as React from 'react'

export interface PageContextType {
  pageId: string
  page: PageFullFragment
  loading: boolean
  tree: ElementTree
}

export const PageContext = React.createContext<PageContextType>({
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  page: null!,
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  pageId: null!,
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  loading: null!,
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  tree: null!,
})

export const PageProvider = ({
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
    <PageContext.Provider value={{ tree, page, pageId, loading }}>
      {children}
    </PageContext.Provider>
  )
}

export const withPageQueryProvider = <TProps extends any>(
  Component: React.ComponentType<TProps>,
) => {
  return (props: TProps) => (
    <PageProvider>
      <Component {...(props as any)} />
    </PageProvider>
  )
}
