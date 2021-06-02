import { PageElementNode } from '@codelab/frontend/shared'
import { useCallback } from 'react'
import { atom, useRecoilState } from 'recoil'

export interface PageBuilderState {
  selectedPageElement: PageElementNode | null
}

const defaultState: PageBuilderState = {
  selectedPageElement: null,
}

const pageBuilderState = atom<PageBuilderState>({
  key: 'pageBuilderState',
  default: defaultState,
})

export const usePageBuilderState = () => {
  const [state, setState] = useRecoilState(pageBuilderState)

  const selectPageElement = useCallback(
    (pageElement: PageElementNode | null) => {
      setState((s) => ({ ...s, selectedPageElement: pageElement }))
    },
    [],
  )

  const reset = useCallback(() => {
    setState((s) => ({ ...defaultState }))
  }, [])

  return { state, selectPageElement, reset }
}
