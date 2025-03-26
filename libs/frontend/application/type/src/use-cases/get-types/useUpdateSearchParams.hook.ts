import type { Key } from 'react'

import { useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

export const useUpdateSearchParams = () => {
  // eslint-disable-next-line ban/ban
  const searchParams = useSearchParams()

  const updateSearchParams = useCallback(
    (expandedKeys: Array<Key>) => {
      const params = new URLSearchParams(searchParams)

      params.delete('expandedNodes')

      expandedKeys.forEach((key) => {
        params.append('expandedNodes', key.toString())
      })

      window.history.pushState(null, '', `?${params.toString()}`)
    },
    [searchParams],
  )

  return { updateSearchParams }
}
