'use client'

import { getNameFromSlug } from '@codelab/shared/utils'
import { useRouter } from 'next/router'

export const useComponentQuery = () => {
  const { query } = useRouter()
  const componentSlug = query.componentSlug as string
  const primarySidebarKey = query.primarySidebarKey as string

  return {
    componentName: getNameFromSlug(componentSlug),
    componentSlug,
    primarySidebarKey,
  }
}
