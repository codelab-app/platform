import { ElementGraphProvider } from '@codelab/frontend/modules/element'
import { withProvider } from '@codelab/frontend/presenter/container'
import { useRouter } from 'next/router'
import * as React from 'react'
import { PageBaseFragment } from '../graphql/PageBase.fragment.graphql.gen'
import { useGetPageQuery } from '../use-cases/get-page'

export interface PageContextType {
  pageId: string
  page: PageBaseFragment
  loading: boolean
}

export const PageContext = React.createContext<PageContextType>({
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  page: null!,
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  pageId: null!,
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  loading: null!,
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

  if (!pageId || !page) {
    return null
  }

  return (
    <PageContext.Provider value={{ page, pageId, loading }}>
      <ElementGraphProvider elementId={page.rootElementId}>
        {children}
      </ElementGraphProvider>
    </PageContext.Provider>
  )
}

export const withPageQueryProvider = withProvider(PageProvider)
