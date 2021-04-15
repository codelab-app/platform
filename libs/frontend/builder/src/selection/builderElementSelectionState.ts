import { useCallback } from 'react'
import { atom, useRecoilState } from 'recoil'

export interface SelectedElementType {
  nodeId: string
  pageElementId: string
  componentElementId: string
}

export interface BuilderSelectionStateType {
  selectedElement: SelectedElementType | undefined
  hoveringElement: SelectedElementType | undefined
}

export const initialBuilderElementSelectionState: BuilderSelectionStateType = {
  hoveringElement: undefined,
  selectedElement: undefined,
}

export const builderElementSelectionState = atom<BuilderSelectionStateType>({
  key: 'builderSelectionState',
  default: initialBuilderElementSelectionState,
})

export const useBuilderSelectionState = () => {
  const [selectionState, setSelectionState] = useRecoilState(
    builderElementSelectionState,
  )

  const setSelected = useCallback(
    (selectedElement: SelectedElementType) => {
      return setSelectionState((s) => ({
        ...s,
        selectedElement,
      }))
    },
    [setSelectionState],
  )

  const setHovering = useCallback(
    (hoveringElement: SelectedElementType) => {
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
