import { __ComponentFragment } from '@codelab/hasura'
import { useCallback } from 'react'
import { atom, useRecoilState } from 'recoil'

interface ComponentBuilderStateType {
  selectedComponent: __ComponentFragment | undefined
  selectedComponentId: string | undefined
  hoveringComponent: __ComponentFragment | undefined
}

const initialComponentBuilderState: ComponentBuilderStateType = {
  selectedComponentId: undefined,
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

  const setSelectedComponentId = useCallback(
    (selectedComponentId: string | undefined) => {
      return setSelectionState((s) => ({
        ...s,
        selectedComponentId,
      }))
    },
    [],
  )

  const setSelected = useCallback((selectedComponent: __ComponentFragment) => {
    return setSelectionState((s) => ({
      ...s,
      selectedComponent,
    }))
  }, [])

  const setHovering = useCallback(
    (hoveringComponent: __ComponentFragment | undefined) => {
      return setSelectionState((s) => ({
        ...s,
        hoveringComponent,
      }))
    },
    [],
  )

  const resetHovering = useCallback(() => {
    setSelectionState((s) => ({
      ...s,
      hoveringComponent: undefined,
    }))
  }, [])

  const resetSelected = useCallback(() => {
    setSelectionState((s) => ({
      ...s,
      selectedComponent: undefined,
    }))
  }, [])

  const reset = useCallback(() => {
    setSelectionState((s) => ({
      ...s,
      hoveringComponent: undefined,
      selectedComponent: undefined,
    }))
  }, [])

  return {
    setSelected,
    resetHovering,
    setHovering,
    hoveringComponent: selectionState.hoveringComponent,
    selectedComponent: selectionState.selectedComponent,
    setSelectedComponentId,
    selectedComponentId: selectionState.selectedComponentId,
    getSelectedComponentId: () => {
      if (!selectionState?.selectedComponentId) {
        throw new Error('No Component is selected')
      }

      return selectionState.selectedComponentId
    },
    resetSelected,
    reset,
  }
}
