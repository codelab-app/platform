import { atom, useAtom } from 'jotai'

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
