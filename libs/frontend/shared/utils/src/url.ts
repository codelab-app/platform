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
