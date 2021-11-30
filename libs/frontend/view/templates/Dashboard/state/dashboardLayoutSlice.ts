import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface DashboardLayoutState {
  metaPaneIsOpen: boolean
}

const defaultState: DashboardLayoutState = {
  metaPaneIsOpen: true,
}

export const dashboardLayoutSlice = createSlice({
  name: 'dashboardLayout',
  initialState: defaultState,
  reducers: {
    toggleMetaPane: (state) => {
      state.metaPaneIsOpen = !state.metaPaneIsOpen
    },
    setMetaPaneOpen: (state, action: PayloadAction<boolean>) => {
      state.metaPaneIsOpen = action.payload
    },
  },
})
