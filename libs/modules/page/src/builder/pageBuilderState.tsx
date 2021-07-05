import { ElementNode } from '@codelab/frontend/shared'
import { useCallback } from 'react'
import { atom, useRecoilState, useSetRecoilState } from 'recoil'

export interface PageBuilderState {
  selectedPageElement: ElementNode | null
  hoveringPageElement: ElementNode | null
}

const defaultState: PageBuilderState = {
  selectedPageElement: null,
  hoveringPageElement: null,
}

const pageBuilderState = atom<PageBuilderState>({
  key: 'pageBuilderState',
  default: defaultState,
})

export const useSetPageBuilderState = () => {
  const setState = useSetRecoilState(pageBuilderState)

  const setSelectedPageElement = useCallback(
    (pageElement: ElementNode | null) => {
      setState((s) => ({ ...s, selectedPageElement: pageElement }))
    },
    [],
  )

  const setHoveringPageElement = useCallback(
    (hoveringElement: ElementNode | null) => {
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
