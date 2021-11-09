import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface BuilderState {
  selectedElementId?: string
  hoveringElementId?: string
  /** Add props here to be added to the elements when rendered */
  extraElementProps: Record<string, Record<string, any> | undefined>
}

const initialState: BuilderState = {
  extraElementProps: {},
  hoveringElementId: undefined,
  selectedElementId: undefined,
}

export interface ElementIdPayload {
  elementId: string
}

export interface ExtraPropsForElementPayload extends ElementIdPayload {
  extraProps: Record<string, any>
}

// TODO finish the builder redux state
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
      { payload }: PayloadAction<ExtraPropsForElementPayload>,
    ) => {
      state.extraElementProps[payload.elementId] = payload.extraProps
    },
  },
})

// Action creators are generated for each case reducer function
export const builderActions = builderSlice.actions
export const builderReducer = builderSlice.reducer
