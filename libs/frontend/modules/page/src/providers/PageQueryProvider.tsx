import { withProvider } from '@codelab/frontend/presenter/container'
import { useRouter } from 'next/router'
import * as React from 'react'
import { PageProvider } from './PageProvider'

export const PageQueryProvider = ({
  children,
}: React.PropsWithChildren<unknown>) => {
  const { query } = useRouter()
  const pageId = query.pageId as string

  return <PageProvider pageId={pageId}>{children}</PageProvider>
}

export const withPageQueryProvider = withProvider(PageQueryProvider)
