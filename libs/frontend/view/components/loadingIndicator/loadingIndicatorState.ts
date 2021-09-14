import { useCallback, useEffect, useState } from 'react'
import { atomFamily, useSetRecoilState } from 'recoil'

export interface LoadingIndicatorState {
  isLoading: boolean
  isErrored: boolean
}

export const loadIndicatorState = atomFamily<LoadingIndicatorState, string>({
  key: 'loading-indicator-state',
  default: {
    isLoading: false,
    isErrored: false,
  },
})

/**
 * Use this to track the loading state of multiple promises
 * @param key
 */
export const usePromisesLoadingIndicator = (key: string | undefined) => {
  const setState = useSetRecoilState(
    loadIndicatorState(key ?? 'defaultLoadingState'),
  )

  const [promises, setPromises] = useState<Array<Promise<any>>>([])

  useEffect(() => {
    setState((s) => ({ ...s, isLoading: promises.length !== 0 }))
  }, [promises, setState])

  const trackPromise = useCallback((promise: Promise<any>) => {
    setPromises([...promises, promise])
    setState((s) => ({ ...s, isErrored: false }))

    return promise
      .then((r) => {
        setPromises((prs) => prs.filter((p) => p !== promise))
        setState((s) => ({ ...s, isErrored: false }))

        return r
      })
      .catch((e) => {
        setPromises((prs) => prs.filter((p) => p !== promise))
        setState((s) => ({ ...s, isErrored: true }))

        return e
      })
  }, [])

  return {
    trackPromise,
  }
}
