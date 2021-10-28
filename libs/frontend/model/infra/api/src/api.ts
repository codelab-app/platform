import { createApi } from '@reduxjs/toolkit/query/react'
import { graphqlBaseQuery } from './graphqlBaseQuery'

export const api = createApi({
  baseQuery: graphqlBaseQuery,
  endpoints: () => ({}),
})
