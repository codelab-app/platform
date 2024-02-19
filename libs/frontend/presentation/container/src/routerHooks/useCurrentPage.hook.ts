import { useStore } from '@codelab/frontend/application/shared/store'
import { getNameFromSlug } from '@codelab/shared/utils'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { useCurrentApp } from './useCurrentApp.hook'

/**
 * Shouldn't throw error since incorrect slug shouldn't break the app, but rather redirect
 */
export const useCurrentPage = () => {
  const app = useCurrentApp()
  const { query } = useRouter()
  const pageSlug = query.pageSlug as string
  const pageName = getNameFromSlug(pageSlug)

  return useMemo(() => {
    if (!app) {
      return undefined
    }

    return app.pages.find((_page) => _page.name === pageName)
  }, [pageName])
}
