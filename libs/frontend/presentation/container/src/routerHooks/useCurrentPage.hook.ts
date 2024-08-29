import { useUrl } from '@codelab/frontend-application-shared-store/router'
import { getNameFromSlug } from '@codelab/shared/utils'
import { useMemo } from 'react'
import { useCurrentApp } from './useCurrentApp.hook'

/**
 * Shouldn't throw error since incorrect slug shouldn't break the app, but rather redirect
 */
export const useCurrentPage = () => {
  const app = useCurrentApp()
  const { pageId } = useUrl()
  const pageName = getNameFromSlug(pageId)

  return useMemo(() => {
    return app.pages.find((_page) => _page.name === pageName)
  }, [pageName])
}
