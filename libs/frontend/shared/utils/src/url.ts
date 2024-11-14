'use client'

import { useSearchParams } from 'next/navigation'

export const useUpdateSearchParams = () => {
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams.toString())

  const updateParams = (
    setParams: (params: URLSearchParams) => void,
    baseUrl?: string,
  ) => {
    setParams(params)

    const url = baseUrl
      ? `${baseUrl}?${params.toString()}`
      : `?${params.toString()}`

    window.history.pushState(null, '', url)
  }

  return {
    updateParams,
  }
}

export const searchParamsAsObject = (keys?: Array<string>) => {
  const searchParams = new URLSearchParams(window.location.search)

  return Object.fromEntries(searchParams.entries())
}
