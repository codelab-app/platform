import { useCallback } from 'react'
import { atom, useRecoilState } from 'recoil'

export interface SelectedComponentType {
  nodeId: string
  pageElementId?: string
  componentElementId: string
}

export interface ComponentBuilderStateType {
  selectedElement: SelectedComponentType | undefined
  hoveringElement: SelectedComponentType | undefined
}

export const initialComponentBuilderState: ComponentBuilderStateType = {
  hoveringElement: undefined,
  selectedElement: undefined,
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
    (selectedElement: SelectedComponentType) => {
      return setSelectionState((s) => ({
        ...s,
        selectedElement,
      }))
    },
    [setSelectionState],
  )

  const setHovering = useCallback(
    (hoveringElement: SelectedComponentType) => {
      return setSelectionState((s) => ({
        ...s,
        hoveringElement,
      }))
    },
    [setSelectionState],
  )

  const resetHovering = useCallback(() => {
    setSelectionState((s) => ({
      ...s,
      hoveringElement: undefined,
    }))
  }, [setSelectionState])

  const resetSelected = useCallback(() => {
    setSelectionState((s) => ({
      ...s,
      selectedElement: undefined,
    }))
  }, [setSelectionState])

  const reset = useCallback(() => {
    setSelectionState((s) => ({
      ...s,
      hoveringElement: undefined,
      selectedElement: undefined,
    }))
  }, [setSelectionState])

  return {
    setSelected,
    resetHovering,
    setHovering,
    selectionState,
    resetSelected,
    reset,
  }
}
