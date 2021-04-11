import { useCallback } from 'react'
import { atom, useRecoilState } from 'recoil'

export interface BuilderSelectionStateType {
  selectedElementId: string | undefined
  hoveringElementId: string | undefined
}

export const initialBuilderElementSelectionState: BuilderSelectionStateType = {
  hoveringElementId: undefined,
  selectedElementId: undefined,
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
    (id: string | undefined) => {
      setSelectionState((s) => ({
        ...s,
        selectedElementId: id,
      }))
    },
    [setSelectionState],
  )

  const setHovering = useCallback(
    (id: string | undefined) => {
      setSelectionState((s) => ({
        ...s,
        hoveringElementId: id,
      }))
    },
    [setSelectionState],
  )

  const resetHovering = useCallback(() => {
    setSelectionState((s) => ({
      ...s,
      hoveringElementId: undefined,
    }))
  }, [setSelectionState])

  const resetSelected = useCallback(() => {
    setSelectionState((s) => ({
      ...s,
      selectedElementId: undefined,
    }))
  }, [setSelectionState])

  const reset = useCallback(() => {
    setSelectionState((s) => ({
      ...s,
      hoveringElementId: undefined,
      selectedElementId: undefined,
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
