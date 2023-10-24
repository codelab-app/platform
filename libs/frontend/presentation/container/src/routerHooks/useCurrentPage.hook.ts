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

    const page = app.pages.find((_page) => _page.current.name === pageName)

    return page?.current
  }, [pageName])
}
