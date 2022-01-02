import { Maybe } from '@codelab/shared/abstract/types'
import { propSafeStringify } from '@codelab/shared/utils'
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { DefaultRootState } from 'react-redux'
import { BuilderDragData } from '../dnd/BuilderDragData'

export enum BuilderTab {
  Tree = 'tree',
  Toolbox = 'toolbox',
}

export type SelectElementActionPayload = Partial<ElementIdPayload>
export type HoverElementActionPayload = Partial<ElementIdPayload>
export type RenderPipeProps = Record<string, any>

export type RenderPropsByElementId = Record<string, Maybe<RenderPipeProps>>

export interface BuilderState {
  selectedElementId?: string
  hoveringElementId?: string

  /** Add props here to be added to the elements when rendered */
  extraElementProps: RenderPropsByElementId

  /** The last rendered props per element id */
  lastRenderedProps: RenderPropsByElementId

  /** Contrary to other tabs, the builder tab is part of the state as it is not related to routing */
  tab: BuilderTab
  currentlyDragging?: BuilderDragData
}

const initialState: BuilderState = {
  extraElementProps: {},
  lastRenderedProps: {},
  hoveringElementId: undefined,
  selectedElementId: undefined,
  tab: BuilderTab.Tree,
  currentlyDragging: undefined,
}

export interface ElementIdPayload {
  elementId: string
}

export interface PropsPerElementIdPayload extends ElementIdPayload {
  props: RenderPipeProps
}

export const builderSlice = createSlice({
  name: 'builder',
  initialState,
  reducers: {
    selectElement: (
      state,
      { payload }: PayloadAction<SelectElementActionPayload>,
    ) => {
      state.selectedElementId = payload.elementId
    },
    hoverElement: (
      state,
      { payload }: PayloadAction<HoverElementActionPayload>,
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
      state.lastRenderedProps[payload.elementId] = JSON.parse(
        propSafeStringify(payload.props),
      )
    },
    setLastRenderedProps: (
      state,
      { payload }: PayloadAction<RenderPropsByElementId>,
    ) => {
      state.lastRenderedProps = payload
    },
    setTab: (state, { payload }: PayloadAction<BuilderTab>) => {
      state.tab = payload
    },
    setCurrentlyDragging: (
      state,
      { payload }: PayloadAction<Maybe<BuilderDragData>>,
    ) => {
      state.currentlyDragging = payload
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
