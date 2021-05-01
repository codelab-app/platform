import { useCallback } from 'react'
import { atom, useRecoilState } from 'recoil'

export interface BuilderSelectionStateType {
  selectedElement: string | undefined
  hoveringElement: string | undefined
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
    (selectedElement: string | undefined) => {
      return setSelectionState((s) => ({
        ...s,
        selectedElement,
      }))
    },
    [setSelectionState],
  )

  const setHovering = useCallback(
    (hoveringElement: string | undefined) => {
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
