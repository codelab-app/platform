import { ApolloClient } from '@apollo/client'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import { AppFragment } from '../App.fragment.graphql.gen'
import { GetAppsGql, GetAppsQuery } from '../use-cases/get-apps'
import { AppState } from './types'

const initialState: AppState = {
  appList: [],
  loading: false,
}

export const getApps = createAsyncThunk(
  'apps/getApps',
  async (args: any, { extra }) => {
    const { client } = extra as { client: ApolloClient<any> }

    const { data } = await client.query<GetAppsQuery>({
      query: GetAppsGql,
      variables: {},
    })

    return data.apps
  },
)

export const appSlice = createSlice({
  name: 'appList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getApps.pending, (state: AppState) => {
        state.loading = true
      })
      .addCase(
        getApps.fulfilled,
        (state: AppState, { payload }: PayloadAction<Array<AppFragment>>) => {
          state.loading = false
          state.appList = payload
        },
      )
      .addCase(getApps.rejected, (state: AppState) => {
        state.loading = false
      })
  },
})

export const useAppSelector = <T>(selector: (state: AppState) => T): T =>
  useSelector(({ apps }: { apps: AppState }) => selector(apps))
