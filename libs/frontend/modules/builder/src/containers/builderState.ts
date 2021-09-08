import { IElementVertex } from '@codelab/shared/abstract/core'
import { ReactElement, useCallback } from 'react'
import { atom, useRecoilValue, useSetRecoilState } from 'recoil'

export interface BuilderHandlers {
  setSelectedElement: (element?: IElementVertex) => void
  setHoveringElement: (element?: IElementVertex) => void
  resetSelection: () => void
  reset: () => void
  setExtraPropsForElement: (
    elementId: string,
    extraProps: Record<string, any>,
  ) => void
}

interface BuilderSelectionState {
  selectedElement?: IElementVertex
  hoveringElement?: IElementVertex
}

export interface BuilderState extends BuilderSelectionState {
  /** Map off all current element props */
  currentElementProps: Record<string, Record<string, any> | undefined>
  /** Add props here to be added to the elements when rendered */
  extraElementProps: Record<string, Record<string, any> | undefined>
}

const defaultSelectionState: BuilderSelectionState = {
  selectedElement: undefined,
  hoveringElement: undefined,
}

const builderSelectionState = atom<BuilderSelectionState>({
  key: 'builderSelectionState',
  default: defaultSelectionState,
})

const builderExtraPropsState = atom<Record<string, any>>({
  key: 'builderExtraPropsState',
  default: {},
})

const builderCurrentPropsState = atom<Record<string, any>>({
  key: 'builderCurrentPropsState',
  default: {},
})

/**
 * Setters for managing the builder state
 * Does not cause a re-render when the state is updated
 */
export const useSetBuilder = (): BuilderHandlers => {
  const setSelectionState = useSetRecoilState(builderSelectionState)
  const setBuilderExtraPropsState = useSetRecoilState(builderExtraPropsState)

  const setBuilderCurrentPropsState = useSetRecoilState(
    builderCurrentPropsState,
  )

  const setSelectedElement = useCallback(
    (element?: IElementVertex) => {
      setSelectionState((s) => ({ ...s, selectedElement: element }))
    },

    [setSelectionState],
  )

  const setHoveringElement = useCallback(
    (hoveringElement?: IElementVertex) => {
      setSelectionState((s) => ({ ...s, hoveringElement: hoveringElement }))
    },
    [setSelectionState],
  )

  const resetSelection = useCallback(() => {
    setSelectionState((s) => ({
      ...s,
      ...defaultSelectionState,
    }))
  }, [setSelectionState])

  const reset = useCallback(() => {
    setSelectionState({ ...defaultSelectionState })
    setBuilderCurrentPropsState({})
    setBuilderExtraPropsState({})
  }, [
    setSelectionState,
    setBuilderCurrentPropsState,
    setBuilderExtraPropsState,
  ])

  const setExtraPropsForElement = useCallback(
    (elementId: string, extraProps: Record<string, any>) => {
      setBuilderExtraPropsState((s) => ({ ...s, [elementId]: extraProps }))
    },
    [setBuilderExtraPropsState],
  )

  return {
    setSelectedElement,
    setHoveringElement,
    resetSelection,
    reset,
    setExtraPropsForElement,
  }
}

export const useBuilderSelection = (): BuilderHandlers & {
  state: BuilderSelectionState
} => {
  const selectionState = useRecoilValue(builderSelectionState)
  const setters = useSetBuilder()

  return {
    ...setters,
    state: selectionState,
  }
}

export const useBuilderExtraProps = () => useRecoilValue(builderExtraPropsState)
export const useBuilderCurrentProps = () =>
  useRecoilValue(builderCurrentPropsState)

export const useBuilder = (): BuilderHandlers & {
  state: BuilderState
} => {
  const selectionState = useRecoilValue(builderSelectionState)
  const extraPropsState = useRecoilValue(builderExtraPropsState)
  const currentPropsState = useRecoilValue(builderCurrentPropsState)
  const setters = useSetBuilder()

  return {
    ...setters,
    state: {
      ...selectionState,
      currentElementProps: currentPropsState,
      extraElementProps: extraPropsState,
    },
  }
}

export interface ElementBuilderHandlers {
  onRendered: (renderedElement: ReactElement, vertex: IElementVertex) => void
}

/**
 * Hook for managing the builder state
 */
export const useOnRendered = (): ElementBuilderHandlers => {
  const setCurrentPropsState = useSetRecoilState(builderCurrentPropsState)

  const onRendered: ElementBuilderHandlers['onRendered'] = useCallback(
    (renderedElement, vertex) => {
      setTimeout(() =>
        setCurrentPropsState((s) => ({
          ...s,
          [vertex.id]: { ...renderedElement.props },
        })),
      )
    },
    [setCurrentPropsState],
  )

  return { onRendered }
}
