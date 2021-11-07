import { createApi } from '@reduxjs/toolkit/query/react'
import { APP_CACHE_TAG, ATOMS_CACHE_TAG, PAGE_CACHE_TAG } from './cache'
import { graphqlBaseQuery } from './graphqlBaseQuery'

export const api = createApi({
  baseQuery: graphqlBaseQuery,
  tagTypes: [APP_CACHE_TAG, PAGE_CACHE_TAG, ATOMS_CACHE_TAG],
  endpoints: () => ({}),
})
