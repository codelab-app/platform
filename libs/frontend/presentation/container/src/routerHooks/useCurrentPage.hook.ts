import { useUrl } from '@codelab/frontend-application-shared-store/router'
import { getNameFromSlug } from '@codelab/shared/utils'
import { useParams, useRouter } from 'next/navigation'
import { useMemo } from 'react'
import { useCurrentApp } from './useCurrentApp.hook'

/**
 * Shouldn't throw error since incorrect slug shouldn't break the app, but rather redirect
 */
export const useCurrentPage = () => {
  const app = useCurrentApp()
  const { pageSlug } = useUrl()
  const pageName = getNameFromSlug(pageSlug)

  return useMemo(() => {
    if (!app) {
      return undefined
    }

    return app.pages.find((_page) => _page.name === pageName)
  }, [pageName])
}
