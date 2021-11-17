import { ElementGraphProvider } from '@codelab/frontend/modules/element'
import * as React from 'react'
import { PageProviderProps } from './types'
import { useProvideCurrentPage } from './useProvideCurrentPage'

export const _PageProvider = ({
  pageId,
  children,
}: React.PropsWithChildren<PageProviderProps>) => {
  const { currentPage } = useProvideCurrentPage(pageId)

  return currentPage ? (
    <ElementGraphProvider elementId={currentPage.rootElementId}>
      {children}
    </ElementGraphProvider>
  ) : null
}

export const PageProvider = React.memo(_PageProvider, (prev, next) => {
  return prev.pageId !== next.pageId
})
