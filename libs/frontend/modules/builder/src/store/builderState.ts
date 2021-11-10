import { PropsByElementId } from '@codelab/shared/abstract/core'
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { DefaultRootState } from 'react-redux'

export interface BuilderState {
  selectedElementId?: string
  hoveringElementId?: string

  /** Add props here to be added to the elements when rendered */
  extraElementProps: PropsByElementId

  /** The last rendered props per element id */
  lastRenderedProps: PropsByElementId
}

const initialState: BuilderState = {
  extraElementProps: {},
  lastRenderedProps: {},
  hoveringElementId: undefined,
  selectedElementId: undefined,
}

export interface ElementIdPayload {
  elementId: string
}

export interface PropsPerElementIdPayload extends ElementIdPayload {
  props: Record<string, any>
}

export const builderSlice = createSlice({
  name: 'builder',
  initialState,
  reducers: {
    selectElement: (
      state,
      { payload }: PayloadAction<Partial<ElementIdPayload>>,
    ) => {
      state.selectedElementId = payload.elementId
    },
    hoverElement: (
      state,
      { payload }: PayloadAction<Partial<ElementIdPayload>>,
    ) => {
      state.hoveringElementId = payload.elementId
    },
    resetSelection: (state) => {
      state.hoveringElementId = undefined
      state.selectedElementId = undefined
    },
    reset: (state) => {
      state.hoveringElementId = undefined
      state.selectedElementId = undefined
      state.extraElementProps = {}
    },
    setExtraPropsForElement: (
      state,
      { payload }: PayloadAction<PropsPerElementIdPayload>,
    ) => {
      state.extraElementProps[payload.elementId] = payload.props
    },
    setLastRenderedPropsForElement: (
      state,
      { payload }: PayloadAction<PropsPerElementIdPayload>,
    ) => {
      state.lastRenderedProps[payload.elementId] = payload.props
    },
  },
})

// Action creators are generated for each case reducer function
export const builderActions = builderSlice.actions
export const builderReducer = builderSlice.reducer

export const selectBuilder = (rootState: DefaultRootState) => rootState.builder

export const builderSelectors = {
  selectedElementId: createSelector(selectBuilder, (s) => s.selectedElementId),
  hoveringElementId: createSelector(selectBuilder, (s) => s.hoveringElementId),
  lastRenderedProps: createSelector(selectBuilder, (s) => s.lastRenderedProps),
  lastRenderedPropsForElement: createSelector(
    [
      selectBuilder,
      // Take the second arg, `category`, and forward to the output selector
      (state, elementId: string) => elementId,
    ],
    (s, elementId) => s.lastRenderedProps[elementId],
  ),
  extraProps: createSelector(selectBuilder, (s) => s.extraElementProps),
  extraPropsForElement: createSelector(
    [
      selectBuilder,
      // Take the second arg, `category`, and forward to the output selector
      (state, elementId: string) => elementId,
    ],
    (s, elementId) => s.extraElementProps[elementId],
  ),
}
