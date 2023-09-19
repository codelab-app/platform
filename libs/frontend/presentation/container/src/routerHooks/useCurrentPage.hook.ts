import { getNameFromSlug } from '@codelab/shared/utils'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { useStore } from '../providers'
import { useCurrentApp } from './useCurrentApp.hook'

/**
 * Shouldn't throw error since incorrect slug shouldn't break the app, but rather redirect
 */
export const useCurrentPage = () => {
  const app = useCurrentApp()
  const { pageService } = useStore()
  const { query } = useRouter()
  const pageSlug = query.pageSlug as string
  const pageName = getNameFromSlug(pageSlug)

  return useMemo(() => {
    if (!app) {
      return undefined
    }

    const page = pageService
      .pagesByApp(app.id)
      .find(({ name }) => name === pageName)

    return page
  }, [pageName])
}
