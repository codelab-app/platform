import { createApi } from '@reduxjs/toolkit/query/react'
import {
  APP_CACHE_TAG,
  ATOMS_CACHE_TAG,
  ELEMENT_CACHE_TAG,
  ELEMENT_GRAPH_CACHE_TAG,
  LAMBDA_CACHE_TAG,
  PAGE_CACHE_TAG,
  TAG_CACHE_TAG,
} from './cache'
import { graphqlBaseQuery } from './graphqlBaseQuery'

export const api = createApi({
  baseQuery: graphqlBaseQuery,
  tagTypes: [
    APP_CACHE_TAG,
    PAGE_CACHE_TAG,
    ELEMENT_CACHE_TAG,
    ELEMENT_GRAPH_CACHE_TAG,
    ATOMS_CACHE_TAG,
    LAMBDA_CACHE_TAG,
    TAG_CACHE_TAG,
  ],
  endpoints: () => ({}),
})
