import { gql } from '@apollo/client'
import { GraphqlOperationOptions } from '@codelab/frontend/model/infra/redux'
import * as Types from '@codelab/shared/abstract/codegen-v2'
import { merge } from 'lodash'
import { api } from './element.endpoints.v2.graphql.gen'
import {
  ElementEdgeFragment,
  ElementFragment,
  ElementGraphFragment,
  ElementWithGraphFragment,
  ElementWithGraphFragmentDoc,
} from './Element.fragment.v2.graphql.gen'

export type GetElementsWithGraphQueryVariables = Types.Exact<{
  options?: Types.InputMaybe<Types.ElementOptions>
  where?: Types.InputMaybe<Types.ElementWhere>
}>

export type NormalizedGraph = {
  vertices: {
    [id: ElementFragment['id']]: ElementFragment
  }
  edges: Array<ElementEdgeFragment>
}

export type GetElementsWithGraphQuery = {
  elements: {
    [id: ElementWithGraphFragment['id']]: NormalizedGraph
  }
}

export const GetElementsWithGraphGql = gql`
  query GetElementsWithGraph($options: ElementOptions, $where: ElementWhere) {
    elements: elements(options: $options, where: $where) {
      ...ElementWithGraph
    }
  }
  ${ElementWithGraphFragmentDoc}
`

export const normalizeVertices = (vertices: ElementGraphFragment['vertices']) =>
  vertices.map((v) => ({ [v.id]: v })).reduce(merge, {})

export const normalizeElement = (element: ElementWithGraphFragment) => ({
  [element.id]: {
    vertices: normalizeVertices(element.graph?.vertices || []),
    edges: element.graph?.edges,
  },
})

const injectedRtkApi = api.injectEndpoints({
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

export { injectedRtkApi as api }
export const {
  useCreateElementsMutation,
  useDeleteElementsMutation,
  useUpdateElementsMutation,
  useDuplicateElementMutation,
  useGetElementsQuery,
  useLazyGetElementsQuery,
  useGetElementsWithGraphQuery,
  useLazyGetElementsWithGraphQuery,
} = injectedRtkApi
