import { atom, getDefaultStore, useAtom } from 'jotai'
import React from 'react'

interface LoadingState {
  error: Error | null
  isLoading: boolean
}

const initialLoadingState: LoadingState = {
  error: null,
  isLoading: false,
}

export const loadingAtom = atom<LoadingState>(initialLoadingState)

export const useLoading = () => {
  const [loadingState, setLoadingState] = useAtom(loadingAtom)

  const setLoading = (isLoading: boolean) => {
    setLoadingState((prev) => ({ ...prev, isLoading }))
  }

  const setError = (error: Error | null) => {
    setLoadingState((prev) => ({ ...prev, error }))
  }

  const reset = () => {
    setLoadingState(initialLoadingState)
  }

  return {
    ...loadingState,
    reset,
    setError,
    setLoading,
  }
}

// export const withLoading = async <T>(promise: Promise<T>): Promise<T> => {
//   const store = getDefaultStore()

//   store.set(loadingAtom, { error: null, isLoading: true })

//   try {
//     const result = await promise

//     store.set(loadingAtom, { error: null, isLoading: false })

//     return result
//   } catch (error) {
//     store.set(loadingAtom, {
//       error: error instanceof Error ? error : new Error(String(error)),
//       isLoading: false,
//     })
//     throw error
//   }
// }
