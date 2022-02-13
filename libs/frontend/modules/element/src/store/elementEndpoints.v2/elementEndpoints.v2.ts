import { gql } from '@apollo/client'
import { GraphqlOperationOptions } from '@codelab/frontend/model/infra/redux'
import { merge } from 'lodash'
import {
  api as generatedApi,
  ElementWithGraphFragment,
  ElementWithGraphFragmentDoc,
} from '../../graphql'
import {
  GetElementsWithGraphQuery,
  GetElementsWithGraphQueryVariables,
} from './types'
import {
  getGraphEntry,
  normalizeElement,
  onCreate,
  onDelete,
  onUpdate,
  runGuards,
} from './utils'

export const GetElementsWithGraphGql = gql`
  query GetElementsWithGraph($options: ElementOptions, $where: ElementWhere) {
    elements: elements(options: $options, where: $where) {
      ...ElementWithGraph
    }
  }
  ${ElementWithGraphFragmentDoc}
`

const injectedElementApi = generatedApi.injectEndpoints({
  endpoints: (build) => ({
    GetElementsWithGraph: build.query<
      GetElementsWithGraphQuery,
      | GraphqlOperationOptions<GetElementsWithGraphQueryVariables>
      | void
      | undefined
    >({
      query: (options) => ({
        document: GetElementsWithGraphGql,
        options: { ...{ context: { env: 'v2' } }, ...options },
      }),
      transformResponse: (res: {
        elements: Array<ElementWithGraphFragment>
      }) => {
        /**
         * reshape response @type GetElementsWithGraphQuery
         *                to @type NormalizedGetElementsWithGraphQuery
         *  {
         *    [element.id]:{
         *      edges : Array<ElementEdgeFragment>
         *      vertices : {
         *        [vertex.id] : ElementFragment
         *      }
         *    }
         *
         *  }
         * because accessing elements in objects is faster than arrays
         */
        const { elements } = res

        const normalizedElements = elements
          .map(normalizeElement)
          .reduce(merge, {})

        return { elements: normalizedElements }
      },
    }),
  }),
})

export const updateCache = (rootId: string, updateRecipe: GraphUpdateHandler) =>
  injectedElementApi.util.updateQueryData(
    'GetElementsWithGraph',
    getGraphEntry(rootId),
    updateRecipe,
  )

export const elementApiV2 = injectedElementApi.enhanceEndpoints({
  endpoints: {
    CreateElements: {
      async onQueryStarted(input, api) {
        const { dispatch, queryFulfilled, getState, requestId } = api
        const { data } = await queryFulfilled
        runGuards(requestId, getState, async (rootId) => {
          const createdElements = data.createElements.elements
          dispatch(updateCache(rootId, onCreate(rootId, createdElements)))
        })
      },
    },
    DuplicateElement: {
      async onQueryStarted(input, api) {
        const { dispatch, queryFulfilled, getState, requestId } = api
        const { data } = await queryFulfilled
        runGuards(requestId, getState, async (rootId) => {
          const duplicatedElements = data.duplicateElement.elements
          dispatch(updateCache(rootId, onCreate(rootId, duplicatedElements)))
        })
      },
    },
    UpdateElements: {
      async onQueryStarted(input, api) {
        const { dispatch, queryFulfilled, getState, requestId } = api
        const { data } = await queryFulfilled
        runGuards(requestId, getState, async (rootId) => {
          const updatedElements = data.updateElements.elements
          dispatch(updateCache(rootId, onUpdate(rootId, updatedElements)))
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

          dispatch(updateCache(rootId, onDelete(rootId, deletedIds)))
        })
      },
    },
  },
})

export { injectedElementApi as elementEndpointsV2 }

export const {
  useCreateElementsMutation,
  useDeleteElementsMutation,
  useUpdateElementsMutation,
  useGetElementsQuery,
  useLazyGetElementsQuery,
  useGetElementsWithGraphQuery,
  useLazyGetElementsWithGraphQuery,
  useDuplicateElementMutation,
} = elementApiV2
