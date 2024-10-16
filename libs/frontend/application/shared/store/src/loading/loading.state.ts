import { atom, useAtom } from 'jotai'
import { debounce } from 'remeda'

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

  // make sure loading indicator appears for at least 500ms to avoid
  // blinking and making it possible to check indicator in E2E tests
  const setLoading = debounce(
    (isLoading: boolean) => {
      setLoadingState((prev) => ({ ...prev, isLoading }))
    },
    { timing: 'both', waitMs: 500 },
  ).call

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
