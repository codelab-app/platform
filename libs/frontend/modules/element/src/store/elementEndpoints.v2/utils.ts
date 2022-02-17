import { RootState } from '@reduxjs/toolkit/dist/query/core/apiState'
import { Recipe } from '@reduxjs/toolkit/dist/query/core/buildThunks'
import { merge, pickBy } from 'lodash'
import { DefaultRootState } from 'react-redux'
import {
  ElementEdgeFragment,
  ElementFragment,
  ElementGraphFragment,
} from '../../graphql'
import { NormalizedGetElementsGraphQuery } from './types'

const fulfilledRequests: Array<string> = []

export const normalizeVertices = (vertices: ElementGraphFragment['vertices']) =>
  vertices.map((v) => ({ [v.id]: v })).reduce(merge, {})

export const normalizeGraph = (graph: ElementGraphFragment) => ({
  vertices: normalizeVertices(graph?.vertices || []),
  edges: graph.edges,
})

export const getGraphEntry = (currentGraphRootId: string) => ({
  variables: { input: { rootId: currentGraphRootId } },
})

const createEdges = (
  created: Array<ElementFragment>,
): Array<ElementEdgeFragment> =>
  created
    .filter((x) => x.parentElement)
    .map(({ id, parentElement, parentElementConnection }) => ({
      // parentElement is defined because of filter
      source: (parentElement as ElementFragment).id,
      target: id,
      order: parentElementConnection.edges[0]?.order,
    }))

const removeEdges = (edges: Array<ElementEdgeFragment>, ids: Array<string>) =>
  edges.filter((x) => !ids.includes(x.source) && !ids.includes(x.target))

export const onCreate =
  (created: Array<ElementFragment>): Recipe<NormalizedGetElementsGraphQuery> =>
  (draft) => {
    draft.vertices = merge(draft.vertices, normalizeVertices(created))
    draft.edges = draft.edges.concat(createEdges(created))
  }

export const onUpdate =
  (updated: Array<ElementFragment>): Recipe<NormalizedGetElementsGraphQuery> =>
  (draft) => {
    const updatedIds = updated.map((x) => x.id)
    draft.vertices = merge(draft.vertices, normalizeVertices(updated))
    draft.edges = removeEdges(draft.edges, updatedIds).concat(
      createEdges(updated),
    )
  }

export const onDelete =
  (deletedIds: Array<string>): Recipe<NormalizedGetElementsGraphQuery> =>
  (draft) => {
    draft.edges = removeEdges(draft.edges, deletedIds)
    draft.vertices = pickBy(
      draft.vertices,
      (_, key) => !deletedIds.includes(key),
    )
  }

const getGraphRootId = (getState: () => RootState<any, any, 'api'>) =>
  (getState() as unknown as DefaultRootState).element.currentGraphRootId

export const runGuards = (
  requestId: string,
  getState: () => RootState<any, any, 'api'>,
  callback: (rootId: string) => void,
) => {
  if (fulfilledRequests.includes(requestId)) {
    return
  }

  const currentGraphRootId = getGraphRootId(getState)

  if (!currentGraphRootId) {
    console.log('Graph cache is not updated, Graph root is not provided')

    return
  }

  callback(currentGraphRootId)
  fulfilledRequests.push(requestId)
}
