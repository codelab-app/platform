'use client'

import type {
  SearchParamsClientProps,
  SearchParamsServerProps,
} from '@codelab/frontend/abstract/types'

import { usePathname, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

/**
 * Non-reactive URL state management
 * Use this when you want to update URL without causing re-renders
 */
export const useUpdateHistoryState = () => {
  const updateParam = useCallback((name: string, value: string | null) => {
    const url = new URL(window.location.href)

    if (value === null) {
      url.searchParams.delete(name)
    } else {
      url.searchParams.set(name, value)
    }

    window.history.replaceState(null, '', url)
  }, [])

  const updateParams = useCallback((params: Record<string, string | null>) => {
    const url = new URL(window.location.href)

    Object.entries(params).forEach(([name, value]) => {
      if (value === null) {
        url.searchParams.delete(name)
      } else {
        url.searchParams.set(name, value)
      }
    })

    window.history.replaceState(null, '', url)
  }, [])

  return { updateParam, updateParams }
}

export const useUpdateSearchParams = () => {
  // eslint-disable-next-line ban/ban
  const searchParams = useSearchParams()
  const pathname = usePathname()

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())

      params.set(name, value)

      return params.toString()
    },
    [searchParams],
  )

  const updateSearchParam = useCallback(
    (name: string, value: string) => {
      const queryString = createQueryString(name, value)

      window.history.replaceState(null, '', `${pathname}?${queryString}`)
    },
    [pathname, createQueryString],
  )

  const appendSearchParam = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())

      params.append(name, value)
      window.history.replaceState(null, '', `${pathname}?${params.toString()}`)
    },
    [pathname, searchParams],
  )

  return { appendSearchParam, createQueryString, updateSearchParam }
}

/**
 * Specialized hook for syncing array values to URL state
 * Similar to useUpdateHistoryState but focused on array synchronization
 */
export const useSyncHistoryState = () => {
  const syncArrayParam = useCallback(
    (key: string, arrayValue: Array<string>) => {
      const url = new URL(window.location.href)

      // Remove existing parameters with this key
      url.searchParams.delete(key)

      // Add each array value as a separate parameter with the same key
      if (arrayValue.length > 0) {
        arrayValue.forEach((value) => {
          url.searchParams.append(key, value)
        })
      }

      window.history.replaceState(null, '', url)
    },
    [],
  )

  return { syncArrayParam }
}
