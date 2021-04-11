import { useCallback } from 'react'
import { useRecoilState } from 'recoil'
import { builderElementSelectionState } from './builderElementSelectionState'

export const useBuilderSelection = () => {
  const [selectionState, setSelectionState] = useRecoilState(
    builderElementSelectionState,
  )

  const select = useCallback(
    (elementId: string) => {
      return setSelectionState((s) => ({
        ...s,
        selectedElementId: elementId,
      }))
    },
    [setSelectionState],
  )

  const hover = useCallback(
    (elementId: string) => {
      return setSelectionState((s) => ({
        ...s,
        hoveringElementId: elementId,
      }))
    },
    [setSelectionState],
  )

  const reset = useCallback(() => {
    return setSelectionState((s) => ({
      ...s,
      selectedElementId: undefined,
      hoveringElementId: undefined,
    }))
  }, [setSelectionState])

  return {
    hover,
    select,
    reset,
    toolbarState: selectionState,
  }
}

export type UseOverlayToolbarFunctions = ReturnType<typeof useBuilderSelection>
