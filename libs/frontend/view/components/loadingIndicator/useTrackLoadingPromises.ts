import { useCallback, useEffect, useState } from 'react'

export interface LoadingData {
  isLoading: boolean
  error: any
}

export interface UseTrackLoadingPromises extends LoadingData {
  trackPromise: (promise: Promise<any>) => void
}

/**
 * Use this to track the loading state of multiple promises
 */
export const useTrackLoadingPromises = (): UseTrackLoadingPromises => {
  const [state, setState] = useState<LoadingData>({
    isLoading: false,
    error: undefined,
  })

  const [promises, setPromises] = useState<Array<Promise<any>>>([])

  useEffect(() => {
    setState((s) => ({ ...s, isLoading: promises.length !== 0 }))
  }, [promises.length])

  const trackPromise = useCallback(
    (promise: Promise<any>) => {
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
    ...state,
    trackPromise,
  }
}
