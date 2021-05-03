import { __ComponentFragment } from '@codelab/hasura'
import { useCallback } from 'react'
import { atom, useRecoilState } from 'recoil'

interface ComponentBuilderStateType {
  selectedComponent: __ComponentFragment | undefined
  hoveringComponent: __ComponentFragment | undefined
}

const initialComponentBuilderState: ComponentBuilderStateType = {
  selectedComponent: undefined,
  hoveringComponent: undefined,
}

const componentBuilderState = atom<ComponentBuilderStateType>({
  key: 'componentBuilderState',
  default: initialComponentBuilderState,
})

export const useComponentBuilder = () => {
  const [selectionState, setSelectionState] = useRecoilState(
    componentBuilderState,
  )

  const setSelected = useCallback(
    (selectedComponent: __ComponentFragment) => {
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
    getSelectedComponentId: () => {
      if (!selectionState?.selectedComponent?.id) {
        throw new Error('No Component is selected')
      }

      return selectionState.selectedComponent.id
    },
    resetSelected,
    reset,
  }
}
