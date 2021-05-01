import { __ComponentFragment } from '@codelab/hasura'
import { useCallback } from 'react'
import { atom, useRecoilState } from 'recoil'

export interface ComponentBuilderStateType {
  selectedComponent: __ComponentFragment | undefined
  hoveringComponent: __ComponentFragment | undefined
}

export const initialComponentBuilderState: ComponentBuilderStateType = {
  selectedComponent: undefined,
  hoveringComponent: undefined,
}

export const componentBuilderState = atom<ComponentBuilderStateType>({
  key: 'componentBuilderState',
  default: initialComponentBuilderState,
})

export const useComponentBuilder = () => {
  const [selectionState, setSelectionState] = useRecoilState(
    componentBuilderState,
  )

  const setSelected = useCallback(
    (selectedComponent: __ComponentFragment | undefined) => {
      return setSelectionState((s) => ({
        ...s,
        selectedComponent,
      }))
    },
    [setSelectionState],
  )

  const setHovering = useCallback(
    (hoveringComponent: __ComponentFragment | undefined) => {
      return setSelectionState((s) => ({
        ...s,
        hoveringComponent,
      }))
    },
    [setSelectionState],
  )

  const resetHovering = useCallback(() => {
    setSelectionState((s) => ({
      ...s,
      hoveringComponent: undefined,
    }))
  }, [setSelectionState])

  const resetSelected = useCallback(() => {
    setSelectionState((s) => ({
      ...s,
      selectedComponent: undefined,
    }))
  }, [setSelectionState])

  const reset = useCallback(() => {
    setSelectionState((s) => ({
      ...s,
      hoveringComponent: undefined,
      selectedComponent: undefined,
    }))
  }, [setSelectionState])

  return {
    setSelected,
    resetHovering,
    setHovering,
    hoveringComponent: selectionState.hoveringComponent,
    selectedComponent: selectionState.selectedComponent,
    resetSelected,
    reset,
  }
}
