import { createApi } from '@reduxjs/toolkit/query/react'
import { APP_CACHE_TAG } from './cacheTags'
import { graphqlBaseQuery } from './graphqlBaseQuery'

export const api = createApi({
  baseQuery: graphqlBaseQuery,
  tagTypes: [APP_CACHE_TAG],
  endpoints: () => ({}),
})
