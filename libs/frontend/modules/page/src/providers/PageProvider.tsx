import { ElementGraphProvider } from '@codelab/frontend/modules/element'
import { withProvider } from '@codelab/frontend/presenter/container'
import { useRouter } from 'next/router'
import * as React from 'react'
import { useProvideCurrentPage } from './useProvideCurrentPage'

export const PageProvider = ({
  children,
}: React.PropsWithChildren<unknown>) => {
  const { query } = useRouter()
  const pageId = query.pageId as string
  const { currentPage } = useProvideCurrentPage(pageId)

  return currentPage ? (
    <ElementGraphProvider elementId={currentPage.rootElementId}>
      {children}
    </ElementGraphProvider>
  ) : null
}

export const withPageProvider = withProvider(PageProvider)
