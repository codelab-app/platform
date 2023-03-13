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
  const [{ error, isLoading }, setState] = useState<LoadingData>({
    error: undefined,
    isLoading: false,
  })

  const [promises, setPromises] = useState<Array<Promise<unknown>>>([])

  useEffect(() => {
    setState((state) => ({ ...state, loading: promises.length !== 0 }))
  }, [promises.length])

  const trackPromise = useCallback(
    (promise: Promise<unknown>) => {
      setPromises((prev) => [...prev, promise])
      setState((state) => ({ ...state, isErrored: false }))

      return promise
        .then((result) => {
          setPromises((previous) =>
            previous.filter((_promise) => _promise !== promise),
          )
          setState((_state) => ({ ..._state, error: undefined }))

          return result
        })
        .catch((_error) => {
          setPromises((_promises) =>
            _promises.filter((_promise) => _promise !== promise),
          )
          setState((_state) => ({ ..._state, error: _error }))

          return _error
        })
    },
    [setState],
  )

  return {
    error,
    isLoading,
    trackPromise,
  }
}
