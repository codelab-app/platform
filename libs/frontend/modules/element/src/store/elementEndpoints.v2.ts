import { Maybe } from '@codelab/shared/abstract/types'
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit'
import { difference, isArray, keys, mergeWith } from 'lodash'
import { DefaultRootState } from 'react-redux'
import {
  api as generatedApi,
  ElementFragment,
  normalizeVertices,
} from '../graphql'
import { CreateElementsMutation } from '../graphql/element.endpoints.v2.graphql.gen'

const customizer = (objValue: any, srcValue: any) =>
  isArray(objValue) ? objValue.concat(srcValue) : undefined

const getGraphCacheArgs = (currentGraphRootId: string) => ({
  variables: { where: { id: currentGraphRootId } },
})

const isCacheUpdated = (cacheIds: Array<string>, createdIds: Array<string>) =>
  difference(createdIds, cacheIds).length === 0

const createCachePatch = (rootId: string, created: Array<ElementFragment>) => ({
  [rootId]: {
    vertices: normalizeVertices(created),
    edges: createEdges(created),
  },
})

const createEdges = (created: Array<ElementFragment>) =>
  created.map((x) => ({
    source: x.parentElement?.id,
    target: x.id,
    order: x.parentElement?.parentElementConnection?.edges[0]?.order,
  }))

const updateCacheAction = (rootId: string, created: Array<ElementFragment>) =>
  generatedApi.util.updateQueryData(
    'GetElementsWithGraph',
    getGraphCacheArgs(rootId),
    (draft) => {
      const cacheVerticesIds = keys(draft.elements[rootId].vertices)
      const createdElementsIds = created.map((x) => x.id)

      if (isCacheUpdated(cacheVerticesIds, createdElementsIds)) {
        return
      }

      const cachePatch = { elements: createCachePatch(rootId, created) }
      mergeWith(draft, cachePatch, customizer)
    },
  )

const updateGraphCache = (
  rootId: Maybe<string>,
  data: CreateElementsMutation,
  dispatch: ThunkDispatch<any, any, AnyAction>,
) => {
  if (!rootId) {
    console.log('Graph cache is not updated, Graph root is not provided')

    return
  }

  const createdElements = data.createElements.elements
  const updateAction = updateCacheAction(rootId, createdElements)

  dispatch(updateAction)
}

export const elementApiV2 = generatedApi.enhanceEndpoints({
  endpoints: {
    CreateElements: {
      async onQueryStarted(_, { dispatch, queryFulfilled, getState }) {
        const { data } = await queryFulfilled

        const currentGraphRootId = (getState() as unknown as DefaultRootState)
          .element.currentGraphRootId

        updateGraphCache(currentGraphRootId, data, dispatch)
      },
    },
  },
})

export { generatedApi as elementEndpointsV2 }

export const {
  useCreateElementsMutation,
  useDeleteElementsMutation,
  useUpdateElementsMutation,
  useGetElementsQuery,
  useLazyGetElementsQuery,
  useGetElementsWithGraphQuery,
  useLazyGetElementsWithGraphQuery,
} = elementApiV2
