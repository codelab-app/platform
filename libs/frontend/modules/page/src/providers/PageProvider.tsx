import { ElementGraphProvider } from '@codelab/frontend/modules/element'
import { useRouter } from 'next/router'
import * as React from 'react'
import { usePage } from '../hooks'
import { PageService } from '../store'

export interface PageProviderProps {
  pages: PageService
}

export const PageProvider = ({
  children,
  pages,
}: React.PropsWithChildren<PageProviderProps>) => {
  const { query } = useRouter()
  const pageId = query.pageId as string
  const { page } = usePage(pageId, pages)

  return page?.rootElementId ? (
    <ElementGraphProvider elementId={page?.rootElementId}>
      {children}
    </ElementGraphProvider>
  ) : null
}
