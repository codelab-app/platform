import { gql } from '@apollo/client'
import { GraphqlOperationOptions } from '@codelab/frontend/model/infra/redux'
import { Maybe } from '@codelab/shared/abstract/codegen-v2'
import { Recipe } from '@reduxjs/toolkit/dist/query/core/buildThunks'
import { api as generatedApi } from '../../graphql/element.endpoints.v2.graphql.gen'
import {
  ElementGraphFragment,
  ElementGraphFragmentDoc,
} from '../../graphql/Element.fragment.v2.graphql.gen'
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

export const updateGraphCache = (
  rootId: string,
  updateRecipe: Recipe<NormalizedGetElementsGraphQuery>,
) =>
  elementInjectedApi.util.updateQueryData(
    'GetElementsGraph',
    getGraphEntry(rootId),
    updateRecipe,
  )

export const elementEndpoints = elementInjectedApi.enhanceEndpoints({
  endpoints: {
    CreateElements: {
      async onQueryStarted(input, api) {
        const { dispatch, queryFulfilled, getState, requestId } = api
        const { data } = await queryFulfilled
        runGuards(requestId, getState, async (rootId) => {
          const createdElements = data.createElements.elements
          dispatch(updateGraphCache(rootId, onCreate(createdElements)))
        })
      },
    },
    DuplicateElement: {
      async onQueryStarted(input, api) {
        const { dispatch, queryFulfilled, getState, requestId } = api
        const { data } = await queryFulfilled
        runGuards(requestId, getState, async (rootId) => {
          const duplicatedElements = data.duplicateElement.elements
          dispatch(updateGraphCache(rootId, onCreate(duplicatedElements)))
        })
      },
    },
    UpdateElements: {
      async onQueryStarted(input, api) {
        const { dispatch, queryFulfilled, getState, requestId } = api
        const { data } = await queryFulfilled
        runGuards(requestId, getState, async (rootId) => {
          const updatedElements = data.updateElements.elements
          dispatch(updateGraphCache(rootId, onUpdate(updatedElements)))
        })
      },
    },
    DeleteElementsSubgraph: {
      async onQueryStarted(input, api) {
        const { dispatch, queryFulfilled, getState, requestId } = api
        const { data } = await queryFulfilled
        runGuards(requestId, getState, async (rootId) => {
          const deletedIds = data.deleteElementsSubgraph.deletedIds || []
          dispatch(updateGraphCache(rootId, onDelete(deletedIds)))
        })
      },
    },
  },
})

export const {
  useGetElementsQuery,
  useLazyGetElementsQuery,
  useCreateElementsMutation,
  useDeleteElementsSubgraphMutation,
  useDuplicateElementMutation,
  useGetElementsGraphQuery,
  useLazyGetElementsGraphQuery,
  useUpdateElementsMutation,
} = elementEndpoints
