import { ElementFragment } from '@codelab/shared/codegen/graphql'
import { useCallback, useEffect } from 'react'
import { atom, useRecoilState, useSetRecoilState } from 'recoil'

export interface UseBuilder {
  selectedElement: ElementFragment | null
  hoveringElement: ElementFragment | null
}

const defaultState: UseBuilder = {
  selectedElement: null,
  hoveringElement: null,
}

const elementBuilderState = atom<UseBuilder>({
  key: 'elementBuilderState',
  default: defaultState,
})

/**
 * Setters for managing the builder state
 * Does not cause a re-render when the state is updated
 */
export const useSetBuilder = () => {
  const setState = useSetRecoilState(elementBuilderState)

  const setSelectedElement = useCallback(
    (element: ElementFragment | null) => {
      setState((s) => ({ ...s, selectedElement: element }))
    },

    [setState],
  )

  const setHoveringElement = useCallback(
    (hoveringElement: ElementFragment | null) => {
      setState((s) => ({ ...s, hoveringElement: hoveringElement }))
    },
    [setState],
  )

  const reset = useCallback(() => {
    setState({ ...defaultState })
  }, [setState])

  useEffect(() => {
    return () => setState({ ...defaultState })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    setSelectedElement,
    setHoveringElement,
    reset,
  }
}

/**
 * Hook for managing the builder state
 */
export const useBuilder = () => {
  const [state] = useRecoilState(elementBuilderState)
  const setters = useSetBuilder()

  return {
    ...setters,
    state,
  }
}
