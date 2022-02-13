import { RootState } from '@reduxjs/toolkit/dist/query/core/apiState'
import { merge, pickBy } from 'lodash'
import { DefaultRootState } from 'react-redux'
import {
  ElementEdgeFragment,
  ElementFragment,
  ElementGraphFragment,
  ElementWithGraphFragment,
} from '../../graphql'
import { GraphUpdateHandler } from './types'

const fulfilledRequests: Array<string> = []

export const normalizeVertices = (vertices: ElementGraphFragment['vertices']) =>
  vertices.map((v) => ({ [v.id]: v })).reduce(merge, {})

export const normalizeElement = (element: ElementWithGraphFragment) => ({
  [element.id]: {
    vertices: normalizeVertices(element.graph?.vertices || []),
    edges: element.graph?.edges,
  },
})

export const getGraphEntry = (currentGraphRootId: string) => ({
  variables: { where: { id: currentGraphRootId } },
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
  (rootId: string, created: Array<ElementFragment>): GraphUpdateHandler =>
  (draft) => {
    const oldGraph = draft.elements[rootId]
    draft.elements[rootId] = {
      vertices: merge(oldGraph.vertices, normalizeVertices(created)),
      edges: oldGraph.edges.concat(createEdges(created)),
    }
  }

export const onUpdate =
  (rootId: string, updated: Array<ElementFragment>): GraphUpdateHandler =>
  (draft) => {
    const oldGraph = draft.elements[rootId]
    const updatedIds = updated.map((x) => x.id)

    draft.elements[rootId] = {
      vertices: merge(oldGraph.vertices, normalizeVertices(updated)),
      edges: removeEdges(oldGraph.edges, updatedIds).concat(
        createEdges(updated),
      ),
    }
  }

export const onDelete =
  (rootId: string, deletedIds: Array<string>): GraphUpdateHandler =>
  (draft) => {
    const oldGraph = draft.elements[rootId]
    draft.elements[rootId] = {
      vertices: pickBy(
        oldGraph.vertices,
        (value, key) => !deletedIds.includes(key),
      ),
      edges: removeEdges(oldGraph.edges, deletedIds),
    }
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
