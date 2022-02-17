import { gql } from '@apollo/client'
import { GraphqlOperationOptions } from '@codelab/frontend/model/infra/redux'
import { Maybe } from '@codelab/shared/abstract/codegen-v2'
import { Recipe } from '@reduxjs/toolkit/dist/query/core/buildThunks'
import {
  api as generatedApi,
  ElementGraphFragment,
  ElementGraphFragmentDoc,
} from '../../graphql'
import {
  GetElementsGraphQueryVariables,
  NormalizedGetElementsGraphQuery,
} from './types'
import {
  getGraphEntry,
  normalizeGraph,
  onCreate,
  onDelete,
  onUpdate,
  runGuards,
} from './utils'

export const GetElementsGraphGql = gql`
  query GetElementsGraph($input: ElementGraphInput!) {
    elementGraph(input: $input) {
      ...ElementGraph
    }
  }
  ${ElementGraphFragmentDoc}
`

const elementInjectedApi = generatedApi.injectEndpoints({
  endpoints: (build) => ({
    GetElementsGraph: build.query<
      NormalizedGetElementsGraphQuery,
      Maybe<GraphqlOperationOptions<GetElementsGraphQueryVariables>> | void
    >({
      query: (options) => ({
        document: GetElementsGraphGql,
        options: { ...{ context: { env: 'v2' } }, ...options },
      }),
      transformResponse: (response: { elementGraph: ElementGraphFragment }) => {
        /**
         * reshape graph from @type ElementGraphFragment
         *                 to @type NormalizedGetElementsGraphQuery
         *  {
         *      edges : Array<ElementEdgeFragment>
         *      vertices : { [vertex.id] : ElementFragment }
         *  }
         *
         * because accessing elements in objects is faster than arrays
         */
        return normalizeGraph(response.elementGraph)
      },
    }),
  }),
})

export const updateCache = (
  rootId: string,
  updateRecipe: Recipe<NormalizedGetElementsGraphQuery>,
) =>
  elementInjectedApi.util.updateQueryData(
    'GetElementsGraph',
    getGraphEntry(rootId),
    updateRecipe,
  )

export const elementApiV2 = elementInjectedApi.enhanceEndpoints({
  endpoints: {
    CreateElements: {
      async onQueryStarted(input, api) {
        const { dispatch, queryFulfilled, getState, requestId } = api
        const { data } = await queryFulfilled
        runGuards(requestId, getState, async (rootId) => {
          const createdElements = data.createElements.elements
          dispatch(updateCache(rootId, onCreate(createdElements)))
        })
      },
    },
    DuplicateElement: {
      async onQueryStarted(input, api) {
        const { dispatch, queryFulfilled, getState, requestId } = api
        const { data } = await queryFulfilled
        runGuards(requestId, getState, async (rootId) => {
          const duplicatedElements = data.duplicateElement.elements
          dispatch(updateCache(rootId, onCreate(duplicatedElements)))
        })
      },
    },
    UpdateElements: {
      async onQueryStarted(input, api) {
        const { dispatch, queryFulfilled, getState, requestId } = api
        const { data } = await queryFulfilled
        runGuards(requestId, getState, async (rootId) => {
          const updatedElements = data.updateElements.elements
          dispatch(updateCache(rootId, onUpdate(updatedElements)))
        })
      },
    },
    DeleteElements: {
      async onQueryStarted(input, api) {
        const { dispatch, queryFulfilled, getState, requestId } = api
        await queryFulfilled
        runGuards(requestId, getState, async (rootId) => {
          const deletedIds =
            (input?.variables?.where?.id_IN as Array<string>) || []

          dispatch(updateCache(rootId, onDelete(deletedIds)))
        })
      },
    },
  },
})

export { elementApiV2 as elementEndpointsV2 }

export const {
  useGetElementsQuery,
  useLazyGetElementsQuery,
  useCreateElementsMutation,
  useDeleteElementsMutation,
  useDuplicateElementMutation,
  useGetElementsGraphQuery,
  useLazyGetElementsGraphQuery,
  useUpdateElementsMutation,
} = elementApiV2
