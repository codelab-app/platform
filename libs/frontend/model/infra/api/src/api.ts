import { createApi } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'
import {
  APP_CACHE_TAG,
  ATOMS_CACHE_TAG,
  COMPONENT_CACHE_TAG,
  ELEMENT_CACHE_TAG,
  ELEMENT_GRAPH_CACHE_TAG,
  FIELD_CACHE_TAG,
  LAMBDA_CACHE_TAG,
  PAGE_CACHE_TAG,
  TAG_CACHE_TAG,
  TYPE_CACHE_TAG,
  TYPE_GRAPH_CACHE_TAG,
  USER_CACHE_TAG,
} from './cache'
import { graphqlBaseQuery } from './graphqlBaseQuery'

export const api = createApi({
  baseQuery: graphqlBaseQuery,
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      console.log(action)

      return action.payload[reducerPath]
    }
  },
  tagTypes: [
    APP_CACHE_TAG,
    PAGE_CACHE_TAG,
    ELEMENT_CACHE_TAG,
    ELEMENT_GRAPH_CACHE_TAG,
    COMPONENT_CACHE_TAG,
    ATOMS_CACHE_TAG,
    LAMBDA_CACHE_TAG,
    TAG_CACHE_TAG,
    USER_CACHE_TAG,
    TYPE_CACHE_TAG,
    FIELD_CACHE_TAG,
    TYPE_GRAPH_CACHE_TAG,
  ],
  endpoints: () => ({}),
})
