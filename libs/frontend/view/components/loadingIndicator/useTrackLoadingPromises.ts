import { useCallback, useEffect, useState } from 'react'

export interface LoadingData {
  isLoading: boolean
  error: unknown
}

export interface UseTrackLoadingPromises extends LoadingData {
  trackPromise: (promise: Promise<unknown>) => void
}

/**
 * Use this to track the loading state of multiple promises
 */
export const useTrackLoadingPromises = (): UseTrackLoadingPromises => {
  const [{ isLoading, error }, setState] = useState<LoadingData>({
    isLoading: false,
    error: undefined,
  })

  const [promises, setPromises] = useState<Array<Promise<unknown>>>([])

  useEffect(() => {
    setState((s) => ({ ...s, loading: promises.length !== 0 }))
  }, [promises.length])

  const trackPromise = useCallback(
    (promise: Promise<unknown>) => {
      setPromises((prev) => [...prev, promise])
      setState((s) => ({ ...s, isErrored: false }))

      return promise
        .then((r) => {
          setPromises((previous) => previous.filter((p) => p !== promise))
          setState((s) => ({ ...s, error: undefined }))

          return r
        })
        .catch((e) => {
          setPromises((prs) => prs.filter((p) => p !== promise))
          setState((s) => ({ ...s, error: e }))

          return e
        })
    },
    [setState],
  )

  return {
    isLoading,
    error,
    trackPromise,
  }
}
