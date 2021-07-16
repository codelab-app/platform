import { ElementFragment } from '@codelab/codegen/graphql'
import { useCallback } from 'react'
import { atom, useRecoilState, useSetRecoilState } from 'recoil'

export interface PageBuilderState {
  selectedElement: ElementFragment | null
  hoveringPageElement: ElementFragment | null
}

const defaultState: PageBuilderState = {
  selectedElement: null,
  hoveringPageElement: null,
}

const pageBuilderState = atom<PageBuilderState>({
  key: 'pageBuilderState',
  default: defaultState,
})

export const useSetPageBuilderState = () => {
  const setState = useSetRecoilState(pageBuilderState)

  const setSelectedPageElement = useCallback(
    (pageElement: ElementFragment | null) => {
      setState((s) => ({ ...s, selectedElement: pageElement }))
    },
    [],
  )

  const setHoveringPageElement = useCallback(
    (hoveringElement: ElementFragment | null) => {
      setState((s) => ({ ...s, hoveringPageElement: hoveringElement }))
    },
    [],
  )

  const reset = useCallback(() => {
    setState({ ...defaultState })
  }, [])

  return {
    selectPageElement: setSelectedPageElement,
    setHoveringPageElement,
    reset,
  }
}

export const usePageBuilderState = () => {
  const [state] = useRecoilState(pageBuilderState)
  const setters = useSetPageBuilderState()

  return {
    ...setters,
    state,
  }
}
