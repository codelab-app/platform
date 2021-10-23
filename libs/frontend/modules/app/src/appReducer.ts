import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppFragment } from './App.fragment.graphql.gen'

export interface AppListState {
  list: Array<AppFragment>
  loading: boolean
  error: string | null
}

const initialState: AppListState = {
  list: [
    { id: '01', name: 'test 01', ownerId: 'test 01' },
    { id: '02', name: 'test 02', ownerId: 'test 02' },
    { id: '03', name: 'test 03', ownerId: 'test 03' },
  ],
  loading: false,
  error: null,
}

export const appListSlice = createSlice({
  name: 'appList',
  initialState,
  reducers: {
    fetchApps: (state) => {
      state.loading = true
    },
    fetchAppsSuccess: (state, action: PayloadAction<Array<AppFragment>>) => {
      state.list = action.payload
      state.loading = false
    },
    fetchAppsFailed: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.loading = false
    },
    resetApps: (state, action) => {
      state = initialState
    },
  },
})

export const { fetchApps, fetchAppsFailed, fetchAppsSuccess, resetApps } =
  appListSlice.actions
