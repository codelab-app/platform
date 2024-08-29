'use client'

import { useRouter } from 'next/router'

export const useComponentQuery = () => {
  const { query } = useRouter()
  const componentId = query.componentId as string
  const primarySidebarKey = query.primarySidebarKey as string

  return {
    componentId,
    primarySidebarKey,
  }
}
