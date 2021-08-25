import {
  ElementFragment,
  useGetElementLazyQuery,
} from '@codelab/shared/codegen/graphql'
import { useCallback, useEffect } from 'react'
import { atom, useRecoilState, useSetRecoilState } from 'recoil'

export interface UseBuilder {
  selectedElement?: ElementFragment
  hoveringElement?: ElementFragment
}

const defaultState = {
  selectedElement: undefined,
  hoveringElement: undefined,
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
    (element?: ElementFragment) => {
      setState((s) => ({ ...s, selectedElement: element }))
    },

    [setState],
  )

  const setHoveringElement = useCallback(
    (hoveringElement?: ElementFragment) => {
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

const useFetchElement = (
  element: ElementFragment | undefined,
  setElement: (element?: ElementFragment) => any,
) => {
  // Doing this makes sure the selected/hovering element objects are updated whenever we mutate the actual element and refetch
  // it should be cached, so this shouldn't cause another api call

  const [fetchElement, { data: fetchedElement, loading }] =
    useGetElementLazyQuery()

  useEffect(() => {
    if (element) {
      fetchElement({
        variables: { input: { elementId: element?.id } },
      })
    }
  }, [fetchElement, element])

  useEffect(() => {
    if (
      element &&
      fetchedElement &&
      fetchedElement.getElement &&
      element.id === fetchedElement.getElement?.id &&
      element !== fetchedElement &&
      !loading
    ) {
      setElement(fetchedElement.getElement)
    }
  }, [element, fetchedElement, loading, setElement])
}

/**
 * Hook for managing the builder state
 */
export const useBuilder = () => {
  const [state] = useRecoilState(elementBuilderState)
  const setters = useSetBuilder()
  useFetchElement(state.selectedElement, setters.setSelectedElement)
  useFetchElement(state.hoveringElement, setters.setHoveringElement)

  return {
    ...setters,
    state,
  }
}
